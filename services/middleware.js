const jwt = require("jsonwebtoken");
const config = require("../config/auth/config");

/**
 * @description Endpoint middleware to ensure only authenticated users have access to specific endpoints.
 * Ref.: https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkToken = (req, res, next) => {
  let token = req.body.headers["Authorization"]; // Express headers are auto converted to lowercase
  console.log("checkToken req", req);
  console.log("checkToken token", token);
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from String
      token = token.slice(7, token.length);
    }

    let payload = {};
    try {
      payload = jwt.verify(token, config.secret);
      req.payload = payload;
      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      }
      return res.status(400).end();
    }
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
