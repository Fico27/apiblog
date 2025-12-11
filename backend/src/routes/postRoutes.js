const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controllers/postController");
const { verifyUser } = require("../middleware/verifyUser");
const commentController = require("../controllers/commentController");

// Regular User Routes //
postRoutes.get("/posts", postController.getPublishedPosts);
postRoutes.get("/posts/:postId", postController.getSinglePost);
postRoutes.post(
  "/posts/:postId/comments",
  verifyUser(["user", "admin"]),
  commentController.postComment
);
//Regular User Routes //

// Admin Routes //
postRoutes.get(
  "/admin/posts",
  verifyUser(["admin"]),
  postController.getAllPosts
);
postRoutes.get(
  "/admin/posts/:postId",
  verifyUser(["admin"]),
  postController.getSingleAdminPost
);
postRoutes.post("/admin/post", verifyUser(["admin"]), postController.postPost);

postRoutes.delete(
  "/admin/posts/:postId",
  verifyUser(["admin"]),
  postController.deleteAdminPost
);

postRoutes.patch(
  "/admin/posts/:postId",
  verifyUser(["admin"]),
  postController.updateAdminPost
);

// Admin Routes //

module.exports = postRoutes;
