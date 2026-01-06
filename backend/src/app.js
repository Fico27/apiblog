const express = require("express");
const session = require("express-session");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const googleAuthRouter = require("./routes/googleAuthRoutes");
const passport = require("./config/passport");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use("/api", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", commentRoutes);
app.use("/auth", googleAuthRouter);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
