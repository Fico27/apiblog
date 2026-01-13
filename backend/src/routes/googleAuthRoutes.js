const express = require("express");
const googleAuthRouter = express.Router();
const passport = require("../config/passport");
const { signToken } = require("../utils/jwt");

const FRONTEND_BASE = process.env.FRONTEND_ADMIN_URL || "http://localhost:5173";

googleAuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        console.error("Google OAuth error:", err);
        if (err.oauthError) {
          console.error("oauthError status:", err.oauthError.statusCode);
          console.error("oauthError data:", err.oauthError.data);
        }
        return res.status(500).send("OAuth failed");
      }
      if (!user) return res.redirect(`${FRONTEND_BASE}/login`);

      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const token = signToken({
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    });

    res.redirect(`${FRONTEND_BASE}/login?token=${encodeURIComponent(token)}`);
  }
);

module.exports = googleAuthRouter;
