const path = require("path");

module.exports = ({ app, db }) => {
  app.get("/", (req, res) => {
    console.log("appRoot", appRoot);
    res.sendFile(path.join(appRoot + "/frontend/build/index.html"));
  });
};
