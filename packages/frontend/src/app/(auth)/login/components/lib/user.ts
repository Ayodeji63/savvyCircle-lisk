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
