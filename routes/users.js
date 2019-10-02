const bcrypt = require("bcrypt");
const middleware = require("../services/middleware");
const saltRounds = 10;
const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = ({ app, db }) => {
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
  app.get("/api/users", middleware.checkToken, (req, res) => {
    res.json({
      success: true,
      message: "User page"
    });
  });
};
