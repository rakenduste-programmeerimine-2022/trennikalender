const jwt = require("jsonwebtoken");
require("dotenv").config();
const options = { expiresIn: "1h" };

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });

    return { error: false, token: token };
  } catch (error) {
    return { error: true };
  }
}
module.exports = { generateJwt };
