const middleware = require("../services/middleware");

module.exports = ({ app, db }) => {
  app.post("/api/users", middleware.checkToken, (req, res) => {
    db.query(
      `SELECT first_name, last_name, email FROM users`,
      (err, results) => {
        if (err) {
          return res.status(403).json(err);
        }

        return res.status(200).json(results);
      }
    );
  });
};
