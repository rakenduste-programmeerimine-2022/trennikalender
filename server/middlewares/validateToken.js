const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded;
    next();
  });
}

module.exports = { validateToken };
