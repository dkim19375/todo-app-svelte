import { PrismaClient } from "@prisma/client";

console.log("Initializing");

const prisma: PrismaClient = new PrismaClient();

export { prisma };