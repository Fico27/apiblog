const prisma = require("../lib/prisma");

async function login(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

module.exports = { login };
