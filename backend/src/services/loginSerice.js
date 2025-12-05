const prisma = require("../lib/prisma");

async function login(username) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

module.exports = { login };
