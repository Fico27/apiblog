const commentService = require("../services/commentService");

async function postComment(req, res) {
  const { postId } = req.params;
  const authorId = req.user.id;
  const { content } = req.body;
  try {
    const newComment = await commentService.createComment(
      content,
      authorId,
      postId
    );

    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment", error);
    res.status(503).json({ error: "Error creating comment" });
  }
}

async function deleteComment(req, res) {
  const commentId = req.params;

  try {
    await commentService.deleteComment(commentId);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting comment", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
}
module.exports = { postComment, deleteComment };
