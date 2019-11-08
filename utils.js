const randomize = maximumLength => {
  return Math.floor(Math.random() * maximumLength) + 1;
};

module.exports = {
  randomize,
};
