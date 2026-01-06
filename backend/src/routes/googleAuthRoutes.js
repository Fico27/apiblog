const Router = require("express");
const googleAuthRouter = Router();
const passport = require("../config/passport");
const { signToken } = require("../utils/jwt");

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
    res.redirect(`http://localhost:5173/login/?token=${token}`);
  }
);

module.exports = googleAuthRouter;
