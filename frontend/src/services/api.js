import axios from "axios";

export const post = async (endpointName, body, headers) => {
  return axios.post(`${process.env.PUBLIC_URL}/api${endpointName}`, {
    ...body,
    ...headers
  });
};

export const signIn = async (email, password) => {
  const response = await post("/signin", { email, password });

  if (response.status === 401) throw new Error("Invalid credential");

  const { token } = await response.json();

  return token;
};

/**
 * @description Rename first_name and last_name to comply with BackEnd naming convention
 * @param {*} params
 */
export const signUp = async params => {
  if (!params) {
    throw new Error("Missing paramers");
  }

  const response = await post("/signup", {
    ...params,
    first_name: params.firstName,
    last_name: params.lastName
  });

  return response;
};

export const verifyToken = async token => {
  const response = await post("/verify", {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response;
};
