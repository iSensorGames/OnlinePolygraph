const bcrypt = require("bcrypt");
const saltRounds = 10;

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = ({ app, db }) => {
  // app.get("/api/users", (req, res) => {
  //   db.query("SELECT * FROM users", (err, rows) => {
  //     if (err) throw err;
  //     res.json(rows).status(200);
  //   });
  // });
  app.post("/api/users/create", (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!emailIsValid(email)) {
      return res
        .json({
          message: "Email format is invalid!",
          error: "email_validation"
        })
        .status(200);
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw err;
      db.query(
        `INSERT INTO users (first_name, last_name, email, password) VALUES ("${first_name}", "${last_name}", "${email}", "${hash}")`,
        (err, results) => {
          if (err) throw err;
          res.json(results).status(200);
        }
      );
    });
  });

  app.post("/api/users", (req, res) => {
    const { email } = req.body;
    const errorMessage = {
      message: "Either the email or the password is incorrect",
      error: "email_password_validation"
    };

    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, rows) => {
      if (err) throw err;

      // Check if there's a user
      if (!!rows.length) {
        const { first_name, last_name, email, password } = rows[0];
        bcrypt.compare(req.body.password, password, (err, result) => {
          if (err) throw err;

          if (!!result) {
            res.json({ first_name, last_name, email }).status(200);
          } else {
            res.send(errorMessage).status(200);
          }
        });
      } else {
        res.send(errorMessage).status(200);
      }
    });
  });
};
