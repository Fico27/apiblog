const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");
const loginSerice = require("../services/loginService");
const userService = require("../services/userService");

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await loginSerice.login(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ error: "Login failed" });
  }
}

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userService.createUser({ username, email, password });

    return res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Error creating user" });
  }
}

async function registerAdmin(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userService.createUser({
      username,
      email,
      password,
      role: "admin",
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Error creating user" });
  }
}

module.exports = { postLogin, registerUser, registerAdmin };
