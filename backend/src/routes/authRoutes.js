const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.post("/login", authController.postLogin);
authRouter.post("/createuser", authController.registerUser);
authRouter.post("/createadmin", authController.registerAdmin);

module.exports = authRouter;
