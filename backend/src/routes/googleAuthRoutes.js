const express = require("express");
const googleAuthRouter = express.Router();
const passport = require("../config/passport");
const { signToken } = require("../utils/jwt");

const FRONTEND_BASE = process.env.FRONTEND_ADMIN_URL || "http://localhost:5173";

googleAuthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

googleAuthRouter.get(
  "/google/callback",

  (req, res, next) => {
    console.log("=== GOOGLE CALLBACK HIT ===");
    console.log("Time:", new Date().toISOString());
    console.log("Method:", req.method);
    console.log("Original URL:", req.originalUrl);
    console.log("Host:", req.get("host"));
    console.log("Referer:", req.get("referer"));
    console.log("X-Forwarded-Proto:", req.get("x-forwarded-proto"));
    console.log("==========================");
    next();
  },

  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_BASE}/login`,
    session: false,
  }),

  (req, res) => {
    const token = signToken({
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    });

    const redirectUrl = new URL(`${FRONTEND_BASE}/login`);
    redirectUrl.searchParams.set("token", token);

    res.redirect(redirectUrl.toString());
  }
);

module.exports = googleAuthRouter;
