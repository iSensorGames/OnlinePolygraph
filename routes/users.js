const middleware = require("../services/middleware");

module.exports = ({ app, db }) => {
  app.get("/api/users", middleware.checkToken, (req, res) => {
    res.json({
      success: true,
      message: "User page"
    });
  });
};
