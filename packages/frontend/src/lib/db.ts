import { PrismaClient } from "@prisma/client";

//@ts-ignore
const prismaClientSingleton = () => {
  return new PrismaClient();
};

//@ts-ignore
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
//@ts-ignore
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
//@ts-ignore
export default prisma;
//@ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
