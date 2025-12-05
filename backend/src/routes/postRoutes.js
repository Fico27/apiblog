const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controllers/postController");

// Regular User Routes //
postRoutes.get("/posts", postController.getPublishedPosts);
postRoutes.get("/posts/:postId", postController.getSinglePost);

//Regular User Routes //

// Admin Routes //
postRoutes.get("/admin/posts", postController.getAllPosts);
postRoutes.get("/admin/posts/:postId", postController.getSingleAdminPost);
postRoutes.post("/admin/post", postController.postPost);

// Admin Routes //

module.exports = postRoutes;
