require("dotenv").config();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("./generated/prisma");

const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = "IamAdmin";

  const hashed = await bcrypt.hash(adminPassword, 12);

  try {
    await prisma.user.create({
      data: {
        username: "admin2",
        email: "admin@admin.com",
        password: hashed,
        role: "admin",
      },
    });

    console.log("Admin user created - username: admin");
  } catch (error) {
    if (error.code === "P2002") {
      console.log("Admin user already exists — nothing to do");
    } else {
      throw error; // let it crash and show real error
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Failed to seed admin user:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
