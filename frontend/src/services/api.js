import axios from "axios";

export const post = async (endpointName, body, headers) => {
  return axios.post(`${process.env.PUBLIC_URL}/api${endpointName}`, {
    ...body,
    ...headers
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
export const signUp = async params => {
  if (!params) {
    throw new Error("Missing paramers");
  }

  const response = await post("/signup", {
    ...params,
    first_name: params.firstName,
    last_name: params.lastName
  });

  const { data } = response;

  return data;
};

/**
 * @description Verify Token's validity
 * @param {*} token
 */
export const verifyToken = async token => {
  if (!token) throw new Error("Token is null");

  const response = await post("/verify", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { data } = response;

  if (response.status !== 200)
    throw new Error("Something went wrong verifying the token");
  if (!data.success) throw new Error(data.message);

  return data;
};
