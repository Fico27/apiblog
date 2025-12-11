const Router = require("express");
const commentRouter = Router();

const { verifyUser } = require("../middleware/verifyUser");
const commentController = require("../controllers/commentController");

commentRouter.post(
  "/posts/:postId/comments",
  verifyUser(["user", "admin"]),
  commentController.postComment
);
