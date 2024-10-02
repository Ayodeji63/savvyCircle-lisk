// useFetchGroups.ts
import { client } from "@/app/client";
import { contractAddress } from "@/contract";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { tokenAddress } from "@/token";

export const liskSepolia = defineChain(534351);

export const contractInstance = getContract({
    client: client,
    chain: liskSepolia,
    address: contractAddress,
});


const tokenContract = getContract({
    client: client,
    chain: liskSepolia,
    address: tokenAddress,
});
