// useFetchGroups.ts
import { client } from "@/app/client";
import { contractAddress } from "@/contract";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { tokenAddress } from "@/token";

export const liskSepolia = defineChain(84532);

export const contractInstance = getContract({
  client: client,
  chain: liskSepolia,
  address: contractAddress,
});

// 0x315F07d57E6378b406E944Ac358a5D1Ce7797570

export const tokenContract = getContract({
  client: client,
  chain: liskSepolia,
  address: tokenAddress,
});
