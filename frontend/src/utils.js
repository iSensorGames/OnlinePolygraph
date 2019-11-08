export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const randomize = maximumLength => {
  return Math.floor(Math.random() * maximumLength);
};
