const prisma = require("../lib/prisma");

async function getPublishedPosts() {
  return await prisma.post.findMany({
    // Include only published for general public
    where: { published: true },
    //include necessary info to be used for the frontend
    include: {
      author: { select: { username: true } },
      comments: {
        include: { author: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      },
      //count all comments
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getPublicPostByID(postId) {
  return await prisma.post.findUnique({
    where: { id: postId, published: true },
    include: {
      author: { select: { username: true } },
      comments: {
        include: { author: { select: { username: true } } },
      },
    },
  });
}

async function getAllAdminPosts() {
  return await prisma.post.findMany({
    include: {
      author: { select: { username: true } },
      comments: {
        include: { author: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      },
      //count all comments
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getAdminPostByID(postId) {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: { username: true } },
      comments: {
        include: { author: { select: { username: true } } },
      },
    },
  });
}

module.exports = {
  getPublishedPosts,
  getAllAdminPosts,
  getPublicPostByID,
  getAdminPostByID,
};
