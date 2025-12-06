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

module.exports = { postComment };
