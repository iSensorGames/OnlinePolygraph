const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth/config');
const middleware = require('../services/middleware');

// Utility Function
const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = ({ app, db }) => {
  app.post('/api/verify', middleware.checkToken, (req, res) => {
    return res
      .json({
        success: true,
        data: req.payload,
      })
      .status(200);
  });
  app.post('/api/signup', (req, res) => {
    const { first_name, last_name, email, password, roles } = req.body;

    let errorMessage = {
      success: false,
      error: 'email_password_validation',
    };

    if (!emailIsValid(email)) {
      errorMessage['message'] = 'Email format is invalid!';
      return res.status(200).json(errorMessage);
    }

    bcrypt.hash(password, config.bcryptSaltRound, (err, hash) => {
      if (err) {
        errorMessage['message'] = 'BCrypt: password format error: ' + err;
        errorMessage['error'] = 'bcrypt_password';
        return res.status(200).json(errorMessage);
      }

      db.query(
        `INSERT INTO users (first_name, last_name, email, password, roles, created_at) VALUES ("${first_name}", "${last_name}", "${email}", "${hash}", ${roles}, NOW())`,
        (err, results) => {
          if (err) {
            errorMessage['message'] = err.sqlMessage || err.code;
            errorMessage['error'] = err.code || 'SQL Error';
            return res.status(200).json(errorMessage);
          }

          const { insertId } = results;
          const id = insertId;

          // Create a new token with the email in the payload
          // and which expires 300 seconds after issue
          const token = jwt.sign(
            { id, email, first_name, last_name, roles },
            config.secret,
            {
              algorithm: 'HS256',
              expiresIn: config.jwtExpirySeconds,
            }
          );

          return res.status(200).json({
            success: true,
            message: 'Authentication successful!',
            token: token,
            user: {
              id,
              email,
              first_name,
              last_name,
              roles,
            },
          });
        }
      );
    });
  });

  app.post('/api/signin', (req, res) => {
    let { email } = req.body;
    const errorMessage = {
      message: 'Email or Password is incorrect.',
      error: 'email_password_validation',
    };

    db.query(
      `SELECT id, first_name, last_name, email, roles, password FROM users WHERE email = "${email}"`,
      (err, rows) => {
        if (err) throw err;

        if (!!rows.length) {
          const { id, first_name, last_name, roles, email, password } = rows[0];
          bcrypt.compare(req.body.password, password, (err, result) => {
            if (err) {
              return res.status(401).end();
            }

            if (!!result) {
              // Create a new token with the email in the payload
              // and which expires 300 seconds after issue
              const token = jwt.sign(
                { id, email, first_name, last_name, roles },
                config.secret,
                {
                  algorithm: 'HS256',
                  expiresIn: config.jwtExpirySeconds,
                }
              );

              // set the cookie as the token string, with a similar max age as the token
              // here, the max age is in milliseconds, so we multiply by 1000
              return res.json({
                success: true,
                message: 'Authentication successful!',
                token,
              });
            } else {
              return res.status(200).json(errorMessage);
            }
          });
        } else {
          return res.status(200).json(errorMessage);
        }
      }
    );
  });
};
