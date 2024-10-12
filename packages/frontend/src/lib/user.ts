"use server";

import prisma from "@/lib/db";

export async function findUser(address: string) {
  const user = await prisma.user.findFirst({
    where: {
      address: address,
    },
  });
  console.log(user);
  return user;
}

export async function findUserTransactions(user: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      fromAddress: user,
    }
  })
  console.log(transactions);
  return transactions;
}

export async function findTransaction(hash: string) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      transactionHash: hash

    }
  })
  console.log(transaction);
  return transaction;
}