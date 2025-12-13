const express = require("express");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentsRoutes");

const app = express();
app.use(express.json());

//Setup quick test.

app.use("/api", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
