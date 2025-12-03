const postService = require("../services/postService");

async function getPublishedPosts(req, res) {
  try {
    const posts = await postService.getPublishedPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error getting published posts", error);
    res.status(500).json({ error: "Failed to load posts" });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllAdminPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error getting all posts", error);
    res.status(500).json({ erro: "Failed to load all posts" });
  }
}

module.exports = {
  getPublishedPosts,
  getAllPosts,
};
