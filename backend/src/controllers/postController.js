const prisma = require("../lib/prisma");

const getPublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { comments: true, author: { select: { username: true } } },
  });
  res.json(posts);
};

module.exports = {
  getPublishedPosts,
};
