export const request = (options, endpointName) => {
  return fetch(`${endpointName}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });
};
