const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controllers/postController");

postRoutes.get("/posts", postController.getPublishedPosts);
postRoutes.get("/admin/posts", postController.getAllPosts);

module.exports = postRoutes;
