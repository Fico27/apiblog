const prisma = require("../lib/prisma");

async function createUser(username, email, password, role = "user") {
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role,
    },
  });
}

module.exports = {
  createUser,
  createAdmin,
};
