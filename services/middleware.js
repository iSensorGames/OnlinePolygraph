const jwt = require("jsonwebtoken");
const config = require("../config/jwt/config");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from String
      token = token.slice(7, token.length);
    }

    console.log("token", token);

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
