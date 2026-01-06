const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const { verifyUser } = require("../middleware/verifyUser");

authRouter.post("/login", authController.postLogin);
authRouter.post("/createuser", authController.registerUser);
authRouter.post("/createadmin", authController.registerAdmin);

//After google login to create user in localstorage after login.

authRouter.get("/me", verifyUser(), (req, res) => {
  res.json({ user: req.user });
});

module.exports = authRouter;
