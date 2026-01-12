const Router = require("express");
const googleAuthRouter = Router();
const passport = require("../config/passport");
const { signToken } = require("../utils/jwt");

const FRONTEND_BASE = process.env.FRONTEND_ADMIN_URL || "http://localhost:5173";

googleAuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = signToken({
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    });

    //Reminder to self. Change back to http://localhost:3000 for local
    res.redirect(`${FRONTEND_BASE}/login/?token=${token}`);
  }
);

module.exports = googleAuthRouter;
