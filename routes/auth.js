const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt/config");

module.exports = ({ app, db }) => {
  app.post("/api/signin", (req, res) => {
    let { email } = req.body;
    const errorMessage = {
      message: "Email or Password is incorrect.",
      error: "email_password_validation"
    };

    db.query(
      `SELECT email, password FROM users WHERE email = "${email}"`,
      (err, rows) => {
        if (err) throw err;

        if (!!rows.length) {
          const { email, password } = rows[0];
          bcrypt.compare(req.body.password, password, (err, result) => {
            if (err) {
              return res.status(401).end();
            }

            if (!!result) {
              // Create a new token with the email in the payload
              // and which expires 300 seconds after issue
              const token = jwt.sign({ email }, config.secret, {
                algorithm: "HS256",
                expiresIn: config.jwtExpirySeconds
              });

              // set the cookie as the token string, with a similar max age as the token
              // here, the max age is in milliseconds, so we multiply by 1000
              return res.json({
                success: true,
                message: "Authentication successful!",
                token: token
              });
            } else {
              return res.json(errorMessage).status(200);
            }
          });
        } else {
          return res.json(errorMessage).status(200);
        }
      }
    );
  });
};
