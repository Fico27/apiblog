const prisma = require("../lib/prisma");

async function createComment(content, authorId, postId) {
  return await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

async function deleteComment(commentId) {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
}

async function updateComment(commentId, update) {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: update,
  });
}

module.exports = { createComment, deleteComment, updateComment };
