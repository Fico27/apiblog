const Router = require("express");
const commentRouter = Router();
const { verifyUser } = require("../middleware/verifyUser");
const commentController = require("../controllers/commentController");
const verifyCommentOwnerOrAdmin = require("../middleware/verifyCommentOwnerOrAdmin");

commentRouter.post(
  "/:postId/comments",
  verifyUser(["user", "admin"]),
  commentController.postComment
);

commentRouter.delete(
  "/comments/:commentId",
  verifyUser(["user", "admin"]),
  verifyCommentOwnerOrAdmin,
  commentController.deleteComment
);

commentRouter.patch(
  "/comments/:commentId",
  verifyUser(["user", "admin"]),
  verifyCommentOwnerOrAdmin,
  commentController.editComment
);

module.exports = commentRouter;
