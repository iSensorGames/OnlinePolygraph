const path = require("path");

module.exports = ({ app, db }) => {
  app.get("*", (req, res) => {
    res.sendFile(path.join(appRoot + "/frontend/build/index.html"));
  });
};
