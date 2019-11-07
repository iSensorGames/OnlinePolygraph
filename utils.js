const Hashids = require("hashids/cjs");
const hashids = new Hashids();

function encrypt(text) {
  return hashids.encode(text);
}

function decrypt(text) {
  return hashids.decode(text);
}

module.exports = {
  encrypt,
  decrypt
};
