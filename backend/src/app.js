const express = require("express");
const postRoutes = require("./routes/postRoutes");
const AuthRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

//Setup quick test.

app.use("/api", postRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
