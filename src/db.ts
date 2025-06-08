import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("\u{1F53A} Prisma DB connected");

export default prisma;
