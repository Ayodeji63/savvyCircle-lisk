import { axiosInstance } from "./axios.js";
import { Web3 } from 'web3';
import { abi } from "../../contractAbi.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getUser from "./getUser.js";
import { tokenAbi } from "../../token.js";
import { Telegraf } from "telegraf";
import { keyboard } from "telegraf/markup";
import { text } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/.env` });

const rpcUrl = "https://rpc.sepolia-api.lisk.com";
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl, { timeout: 400000 }));
const address = '0x57aa54a38243f8df625a0d24f8a8f77cf4663060';
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
const contract = new web3.eth.Contract(abi, address);
const tokenAddress = "0x8de23bbe29028d6e646950db8d99ee92c821b5bb"
const token = new web3.eth.Contract(tokenAbi,)
web3.eth.accounts.wallet.add(account);
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);
const web_link = "";

function sendMessage(chatId, messageText) {
    return axiosInstance.get("sendMessage", {
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'  // This allows us to use HTML formatting in our messages
    });
}

bot.launch((ctx) => ctx.reply("Launhing", {
    reply_markup: { keyboard: [[{ text: "web app", web_app: web_link }]] }
}))

function handleMessage(messageObj) {
    // Check if this is a new member join event
    if (messageObj.new_chat_members && messageObj.new_chat_members.length > 0) {
        return handleNewMember(messageObj);
    }

    const messageText = messageObj.text || "";
    const name = messageObj.from.first_name;
    console.log(name);

    if (messageText.charAt(0) === "/") {
        const command = messageText.substr(1);
        switch (command) {
            case "start":
                return sendMessage(messageObj.chat.id, `Hi! ${name} I'm a bot. I can help you to get started quickly`);
            case "create":
                return handleCreateGroup(messageObj);
            case "join":
                return handleJoinGroup(messageObj)
            case "launch":
                return handleJoinGroup(messageObj)
            default:
                return sendMessage(messageObj.chat.id, "I'm sorry, I didn't understand your command. Please try again");
        }
    } else {
        return sendMessage(messageObj.chat.id, messageText);
    }
}

// TODO: show users groups

async function handleCreateGroup(messageObj) {


    const groupName = messageObj.chat.title;
    const chatId = messageObj.chat.id;
    const name = messageObj.from.username;
    console.log(`This is name ${name}`);



    // const userAddress = messageObj.from.id.toString();
    const userAddress = process.env.INITIAL_OWNER;

    try {

        const nonce = await web3.eth.getTransactionCount(account.address);

        const receipt = await contract.methods.createGroup(groupName, userAddress, chatId).send({
            from: account.address,
            gas: '2000000',
            nonce: nonce // Explicitly set the nonce in the transaction
        });

        console.log(`Transaction receipt:`, receipt);
        return sendMessage(messageObj.chat.id, `Group "${groupName}" created successfully! Transaction hash: ${receipt.transactionHash} `)
    } catch (error) {
        console.error('Error creating group:', error);
        return sendMessage(messageObj.chat.id, "An error occurred while creating the group. Please try again.");
    }
}

async function handleJoinGroup(messageObj) {
    const groupName = messageObj.chat.title;
    const chatId = messageObj.chat.id;
    const name = messageObj.from.username;
    console.log(`This is name ${name}`);


    // const userAddress = messageObj.from.id.toString();
    try {
        // const nonce = await web3.eth.getTransactionCount(account.address);
        const user = await getUser(name);
        const address = user.address;
        const nonce = await web3.eth.getTransactionCount(account.address);


        const receipt = await contract.methods.joinGroup(chatId, address).send({
            from: account.address,
            gas: '2000000',
            nonce: nonce // Explicitly set the nonce in the transaction
        });

        console.log(`Transaction receipt:`, receipt);
        return sendMessage(messageObj.chat.id, `You Join "${groupName}", check you app for more info! Transaction hash: ${receipt.transactionHash} `)
    } catch (error) {
        console.error('Error creating group:', error);
        return sendMessage(messageObj.chat.id, "An error occurred while creating the group. Please try again.");
    }
}
function handleNewMember(messageObj) {
    const newMembers = messageObj.new_chat_members;
    const chatId = messageObj.chat.id;
    const chatTitle = messageObj.chat.title || "this group";

    newMembers.forEach(member => {
        const welcomeMessage = `
<b>Welcome to ${chatTitle}, ${member.first_name}!</b> 🎉

We're excited to have you join our SavvyCircle community. Here's how you can get started:

1. Type /start to begin your journey
2. Use /lauch to launch the app
3. Use /join to become a part of an existing group

If you need any help, just ask! Happy saving! 💰
        `;

        sendMessage(chatId, welcomeMessage);
    });
}

export { handleMessage };