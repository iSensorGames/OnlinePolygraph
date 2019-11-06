/**
 * Express Routes
 *
 * @param reqParams (app, db)
 */
module.exports = reqParams => {
  return {
    auth: require("./auth")(reqParams),
    conversation: require("./conversation")(reqParams)
  };
};
