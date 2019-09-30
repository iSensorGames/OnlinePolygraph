module.exports = ({ app, db }) => {
  app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, rows) => {
      if (err) throw err;
      res.json(rows).status(200);
    });
  });
};
