module.exports = ({ app, db }) => {
  app.post("/api/auth", (req, res) => {
    let body = req.body;

    res.sendStatus(200);
  });
};
