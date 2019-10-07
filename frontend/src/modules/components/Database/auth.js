import axios from "axios";

// Constants
import * as authConstants from "../../../modules/constants/auth";

export const signInWithEmailAndPassword = async (email, password) =>
  await axios.post("/api/signin", { email, password });

export const createUserWithEmailAndPassword = (email, password) => {
  return { email, password };
};

export const onAuthUserListener = async () => {
  const token = localStorage.getItem(authConstants.KEY)
    ? JSON.parse(localStorage.getItem(authConstants.KEY)).token
    : null;

  if (!token) return null;

  return await axios.get("/api/verify", {
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
