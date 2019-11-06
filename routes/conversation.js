const middleware = require("../services/middleware");

module.exports = ({ app, db }) => {
  app.post("/api/addConversation", middleware.checkToken, (req, res) => {
    res.json({
      success: true,
      message: "User page"
    });
  });
};
