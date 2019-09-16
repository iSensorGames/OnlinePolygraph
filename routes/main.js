const path = require("path");

module.exports = ({ app, db }) => {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
  });
};
