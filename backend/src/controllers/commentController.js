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
  try {
    const { commentId } = req.params;

    await commentService.deleteComment(commentId);

    res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Comment not found" });
    }

    console.error("Error deleting comment", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
}

async function editComment(req, res) {
  try {
    const { commentId } = req.params;
    const update = req.body;

    const comment = await commentService.editComment(commentId, update);

    res.status(200).json(comment);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Comment not found" });
    }

    console.error("Error updating comment", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
}
module.exports = { postComment, deleteComment, editComment };
