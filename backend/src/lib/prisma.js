require("dotenv").config();
const { PrismaClient } = require("../../generated/prisma");

const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
