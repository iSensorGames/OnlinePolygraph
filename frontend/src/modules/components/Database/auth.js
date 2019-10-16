import axios from "axios";

// Constants
import * as authConstants from "../../../modules/constants/auth";

export const signInWithEmailAndPassword = async (email, password) =>
  await axios.post(`${process.env.PUBLIC_URL}/api/signin`, { email, password });

export const createUserWithEmailAndPassword = async ({
  email,
  password,
  firstName,
  lastName,
  roles
}) =>
  await axios.post(`${process.env.PUBLIC_URL}/api/signup`, {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    roles
  });

export const onAuthUserListener = async () => {
  const token = localStorage.getItem(authConstants.KEY)
    ? JSON.parse(localStorage.getItem(authConstants.KEY)).token
    : null;

  if (!token) return null;

  return await axios.post(`${process.env.PUBLIC_URL}/api/verify`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const signOut = () => {
  localStorage.removeItem(authConstants.KEY);
};

export const passwordReset = () => {
  return () => {};
};

export const passwordUpdate = () => {
  return () => {};
};
