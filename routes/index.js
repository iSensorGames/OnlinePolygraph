/**
 * Express Routes
 *
 * @param reqParams (app, db)
 */
module.exports = reqParams => {
  return {
    auth: require("./auth")(reqParams),
    users: require("./users")(reqParams)
  };
};
