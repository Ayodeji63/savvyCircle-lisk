"use server";

import prisma from "@/lib/db";

export async function findMany() {
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
}
