const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
