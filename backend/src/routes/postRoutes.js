const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controllers/postController");
const { verifyUser } = require("../middleware/verifyUser");

// Regular User Routes //
postRoutes.get("/posts", postController.getPublishedPosts);
postRoutes.get("/posts/:postId", postController.getSinglePost);

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

// Admin Routes //

module.exports = postRoutes;
