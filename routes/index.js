/**
 * Express Routes
 *
 * @param reqParams (app, db)
 */
module.exports = reqParams => {
  return {
    users: require("./users")(reqParams),
    main: require("./main")(reqParams)
  };
};
