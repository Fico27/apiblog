const { verifyToken } = require("../utils/jwt");

function verifyUser(allowedUsers = ["user", "admin"]) {
  return (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      //gets token from header and splits it from the rest
      const token = bearer.split(" ")[1];
      const payload = verifyToken(token);

      if (!allowedUsers.includes(payload.role)) {
        return res.status(403).json({ error: "Insufficent permissions" });
      }

      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

module.exports = {
  verifyUser,
};
