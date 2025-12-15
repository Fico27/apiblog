const prisma = require("../lib/prisma");
const postService = require("../services/postService");

//For users//
async function getPublishedPosts(req, res) {
  try {
    const posts = await postService.getPublishedPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting published posts", error);
    res.status(500).json({ error: "Failed to load posts" });
  }
}

async function getSinglePost(req, res) {
  const { postId } = req.params;
  try {
    const post = await postService.getPublicPostByID(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error getting post", error);
    res.status(500).json({ error: "Failed to load desired post" });
  }
}
//For users//

//For admin//
async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllAdminPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error getting all posts", error);
    res.status(500).json({ error: "Failed to load all posts" });
  }
}

async function getSingleAdminPost(req, res) {
  const { postId } = req.params;
  try {
    const post = await postService.getAdminPostByID(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error getting post", error);
    res.status(500).json({ error: "Failed to load desired post" });
  }
}

async function postPost(req, res) {
  try {
    const { title, content, published } = req.body;
    const authorId = req.user.id;

    //When i add auth I can pull authorId from that
    const newPost = await postService.postCreatePost(
      title,
      content,
      authorId,
      published
    );

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post", error);
    res.status(503).json({ error: "Failed to create post" });
  }
}

async function deleteAdminPost(req, res) {
  try {
    const { postId } = req.params;

    await postService.deletePost(postId);

    return res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post not found" });
    } else {
      console.error("Error deleting post", error);
      return res.status(500).json({ error: "Error deleting post" });
    }
  }
}

async function updateAdminPost(req, res) {
  try {
    const { postId } = req.params;
    const updates = req.body;

    const post = await postService.updatePost(postId, updates);

    res.status(200).json(post);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post not found" });
    }
    console.error("Error updating post", error);
    return res.status(500).json({ error: "Error updating post" });
  }
}

//For admin//

module.exports = {
  getPublishedPosts,
  getAllPosts,
  getSinglePost,
  getSingleAdminPost,
  postPost,
  deleteAdminPost,
  updateAdminPost,
};
