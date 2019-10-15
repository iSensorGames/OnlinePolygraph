const path = require("path");

module.exports = ({ app, db }) => {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Index.html",
      success: true
    });
  });
};
