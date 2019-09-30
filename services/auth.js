const fs = require("fs");
const jwt = require("jsonwebtoken");

const privateKEY = fs.readFileSync("../config/jwt/private.key", "utf-8");
const publicKEY = fs.readFileSync("../config/jwt/public.key", "utf-8");

module.exports = {
  sign: (payload, $Options) => {
    const signOptions = {
      issuer: $Options.issuer,
      subject: $Options.subject,
      audience: $Options.audience,
      expiresIn: "30d", // 30 days validity
      algorithm: "RS256"
    };

    return jwt.sign(payload, privateKEY, signOptions);
  },
  verify: (token, $Option) => {
    const verifyOptions = {
      issuer: $Option.issuer,
      subject: $Option.subject,
      audience: $Option.audience,
      expiresIn: "30d",
      algorithm: ["RS256"]
    };

    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: token => {
    return jwt.decode(token, { complete: true });
  }
};
