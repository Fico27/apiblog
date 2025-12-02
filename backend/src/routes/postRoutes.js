const { Router } = require("express");
const postRoutes = Router();
const postController = require("../controllers/postController");

postRoutes.get("/", postController.getPublishedPosts);

// postRoutes.get("/", (req, res) => {
//   res.json({
//     test: "I AM A TEST",
//   });
// });

module.exports = postRoutes;
