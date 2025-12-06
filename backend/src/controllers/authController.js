const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");
const loginSerice = require("../services/loginSerice");

async function postLogin(req, res) {
  try {
    const { username, password } = req.body;

    const user = await loginSerice.login(username);

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

module.exports = { postLogin };
