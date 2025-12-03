const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controllers/postController");

postRoutes.get("/", postController.getPublishedPosts);

module.exports = postRoutes;
