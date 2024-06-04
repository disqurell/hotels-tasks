const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    return null;
  }
}

function generateJWT(nickname) {
  token = jwt.sign(
    {
      nickname: nickname,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}

module.exports = {
  validateJWT,
  generateJWT,
};
