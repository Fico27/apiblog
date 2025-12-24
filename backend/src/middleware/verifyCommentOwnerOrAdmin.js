const prisma = require("../lib/prisma");

async function verifyCommentOwnerOrAdmin(req, res, next) {
  const { commentId } = req.params;

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    select: { authorId: true },
  });

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  if (comment.authorId !== req.user.id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this comment" });
  }

  next();
}

module.exports = verifyCommentOwnerOrAdmin;
