"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User, ArrowLeft, DollarSign } from "lucide-react";
import BackButton from "@/components/common/back-button";
import { findMany } from "../../../lib/findmany";
import { motion } from "framer-motion";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { tokenContract } from "@/lib/libs";
import { formatEther, parseEther } from "viem";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { notification } from "@/utils/notification";
import { transactionSchema } from "@/types/utils";
import { findUser, findUserTransactions } from "@/lib/user";
import { createTransaction } from "@/actions/actions";
import { useAuthContext } from "@/context/AuthContext";
import { Icons } from "@/components/common/icons";
import TransactionsList from "@/components/TransactionList";

interface Friend {
  id: string;
  username: string;
  address: string;
}

interface Transaction {
  data: string | null;
  type: string;
  id: string;
  status: string;
  amount: string;
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  createdAt: Date;
  userId: string;
}
interface FriendActionProps {
  friendAction: (friend: Friend) => void;
}

const FriendAvatar: React.FC<{ friend: Friend } & FriendActionProps> = ({
  friend,
  friendAction,
}) => {
  const cleanUsername = friend.username.replace(/\s+/g, "").toLowerCase();

  const avatar = createAvatar(avataaars, {
    seed: cleanUsername,
    backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"],
  });

  return (
    <motion.div
      className="mr-4 flex w-16 flex-shrink-0 flex-col items-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => friendAction(friend)}
    >
      <div
        className="mb-1 h-12 w-12 overflow-hidden rounded-full shadow-lg ring-2 ring-white"
        style={{
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
        dangerouslySetInnerHTML={{ __html: avatar.toString() }}
      />
      <span className="w-full truncate text-center text-xs text-gray-600">{`${cleanUsername}.eth`}</span>
    </motion.div>
  );
};

const MoneyTransfer = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [receiver, setReceiver] = useState("");
  const [availableMoney, setAvailableMoney] = useState(8666.0);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friend, setFriend] = useState<Friend>();
  const [loading, setLoading] = useState(false);
  const account = useActiveAccount();
  const { user, transactions, setTransactions } = useAuthContext();

  const {
    data: userBalance,
    isLoading: tokenBalanceLoading,
    refetch: refetchBalance,
  } = useReadContract({
    contract: tokenContract,
    method: "function balanceOf(address) returns (uint256)",
    params: account ? [account.address] : ["0x"],
  });

  const handleSend = async () => {
    try {
      setLoading(true);
      console.log(`Sending ${amount} to ${recipient}`);
      // const user = await findUser(String(account?.address));
      console.log(user);

      const receipt = await transfer();
      if (!receipt) {
        setLoading(false)
        return;
      }
      if (!friend) return;
      if (receipt) {
        const params: transactionSchema = {
          fromAddress: String(user?.username),
          toAddress: friend?.username,
          amount: String(amount),
          type: 'transfer',
          transactionHash: String(receipt?.transactionHash),
          status: 'success',
        }
        await createTransaction(params);
        const tx = await findUserTransactions(user?.username ?? '');
        setTransactions(tx);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      notification.error("Transfer Failed");
    }
  };

  const handleSetFriend: FriendActionProps["friendAction"] = (_friend) => {
    setFriend(_friend);
    setRecipient(`${_friend.username.toLowerCase()}.base.eth`);
    setReceiver(_friend.address);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const fetchedFriends = await findMany();
      setFriends(fetchedFriends);
      const tx = await findUserTransactions(user?.username ?? '');
      setTransactions(tx);
    };
    fetchFriends();

  }, []);

  const transfer = async () => {
    try {
      const transaction = prepareContractCall({
        contract: tokenContract,
        method: "function transfer(address, uint256)",
        params: [receiver, parseEther(String(amount))],
      });

      if (!account) return;
      const waitForReceiptOptions = await sendTransaction({
        account,
        transaction,
      });
      if (!waitForReceiptOptions) {
        notification.error("An error occured");
        return;
      }
      console.log(waitForReceiptOptions);

      notification.success("Transfer Successful");
      refetchBalance();
      return waitForReceiptOptions;
    } catch (error) {
      console.log(error);
      notification.error("An error occured");
    }
  };

  function formatViemBalance(balance: bigint): string {
    // Convert the balance to a number
    const balanceInEther = parseFloat(formatEther(balance));

    // Format the number with commas
    const formattedBalance = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(balanceInEther);

    // Add magnitude representation for millions and thousands
    if (balanceInEther >= 1000000) {
      return `${formattedBalance}`;
    } else if (balanceInEther >= 1000) {
      return `${formattedBalance}`;
    } else {
      return formattedBalance;
    }
  }

  return (
    <div className="overlow-hidden flex h-screen w-screen flex-col bg-green-50 text-green-800">
      <header className="flex items-center bg-green-900 p-4 text-white">
        <BackButton />
        <h1 className="ml-4 text-xl font-bold">Transfer</h1>
      </header>

      <main className="flex flex-grow flex-col justify-normal overflow-y-auto p-6">
        <div className="mb-6">
          <div className="mb-6 flex items-center rounded-lg bg-white p-4 shadow-md">
            <div className="mr-3 rounded-full bg-green-100 p-2">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="recipient's base name or address"
              className="flex-grow bg-transparent text-green-800 focus:outline-none"
            />
          </div>

          <div className="mb-8 w-full overflow-x-auto">
            <div className="inline-flex pb-2">
              {friends.map((friend) => (
                <FriendAvatar
                  key={friend.id}
                  friend={friend}
                  friendAction={handleSetFriend}
                />
              ))}
            </div>{" "}
          </div>

          <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
            <div className="mb-2 flex items-center justify-center">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-11/12 bg-transparent text-center text-6xl font-bold text-green-800 focus:outline-none"
                placeholder="#0.00"
              />
            </div>
            <p className="mt-2 text-center text-green-600">
              Available balance: #
              {formatViemBalance(userBalance ?? BigInt(200000000000))}
            </p>
          </div>

          <button
            onClick={handleSend}
            className="mb-6 w-full rounded-lg bg-green-600 py-4 text-lg font-bold text-white shadow-md transition duration-300 hover:bg-green-700"
          >
            {loading ? <LoadingSpinner /> : "Send Money"}
          </button>
        </div>
        {transactions && (

          <div className="container mx-auto p-4">
            <TransactionsList transactions={transactions} />
          </div>
        )}

      </main>
    </div>
  );
};

export default MoneyTransfer;
