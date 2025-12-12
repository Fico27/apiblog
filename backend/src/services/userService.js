const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

async function createUser({ username, email, password, role = "user" }) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return await prisma.user.create({
    data: {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

module.exports = {
  createUser,
};
