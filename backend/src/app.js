const express = require("express");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

//Setup quick test.

app.use("/api", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
