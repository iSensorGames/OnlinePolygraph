const crypto = require("crypto");

const middleware = require("../services/middleware");

module.exports = ({ app, db }) => {
  app.post("/api/addConversation", middleware.checkToken, (req, res) => {
    const { userId } = req.body;

    console.log("userId: ", userId);
    db.query(
      `INSERT INTO conversations (creator_id, created_at) VALUES (${userId}, NOW())`,
      (err, results) => {
        if (err) {
          return res.status(403).json(err);
        }

        const { insertId } = results;
        const generatedHash = crypto
          .createHash("md5")
          .update(insertId.toString(), "utf-8")
          .digest("HEX");

        return res.json({
          success: true,
          insertId: generatedHash
        });
      }
    );
  });

  app.post("/api/message", middleware.checkToken, (req, res) => {
    const { userId, roomId, message } = req.body;

    console.log("userId: ", userId);
    console.log("roomId: ", roomId);
    console.log("message: ", message);

    // db.query(
    //   `INSERT INTO messages (conversation_id, sender_id, message, created_at) VALUES (${roomId}, ${userId}, ${message}, NOW())`,
    //   (err, results) => {
    //     if (err) {
    //       return res.status(403).json(err);
    //     }

    //     const { insertId } = results;
    //     const generatedHash = crypto
    //       .createHash("md5")
    //       .update(insertId.toString(), "utf-8")
    //       .digest("HEX");

    //     return res.json({
    //       success: true,
    //       insertId: generatedHash
    //     });
    //   }
    // );
  });
};
