import axios from "axios";
import { get } from "http";

export const post = async (endpointName, options) => {
  return axios.post(`${process.env.PUBLIC_URL}/api${endpointName}`, {
    ...options
  });
};

export const signIn = async (email, password) => {
  const response = await post("/signin", { email, password });
  const { data } = response;

  if (response.status === 401) throw new Error("Invalid credential");
  if ("error" in data) throw new Error(data.message);

  return data;
};

/**
 * @description Rename first_name and last_name to comply with BackEnd naming convention
 * @param {*} params
 */
export const signUp = params => {
  if (!params) {
    throw new Error("Missing paramers");
  }

  return new Promise(async (resolve, reject) => {
    const response = await post("/signup", {
      ...params,
      first_name: params.firstName,
      last_name: params.lastName
    });
    const { data } = response;

    if ([400, 401, 403].includes(response.status)) reject(response);
    if ("error" in data) reject(data);

    resolve(data);
  });
};

/**
 * @description Verify Token's validity
 * @param {*} token
 */
export const verifyToken = async token => {
  if (!token) throw new Error();

  try {
    const response = await post("/verify", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const { data } = response;

    if (response.status !== 200)
      throw new Error("Something went wrong verifying the token");
    if (!data.success) throw new Error();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createConversation = async (token, params) => {
  if (!token) throw new Error();

  const response = await post("/addConversation", {
    ...params,
    headers: { Authorization: `Bearer ${token}` }
  });
  const { data } = response;

  if (response.status === 403) throw new Error("Parse error: " + response);
  if (response.status !== 200)
    throw new Error("Something went wrong verifying the token");
  if (!data.success) throw new Error();

  return data;
};

export const getUsers = async token => {
  const response = await post("/users", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { data } = response;

  if (response.status === 403) throw new Error("Authorization failed");
  if (response.status !== 200) throw new Error("Something wen wrong.");

  return data;
};
