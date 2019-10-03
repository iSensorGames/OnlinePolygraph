import axios from "axios";

export const signInWithEmailAndPassword = async (email, password) =>
  await axios.post("/api/signin", { email, password });

export const createUserWithEmailAndPassword = (email, password) => {
  return { email, password };
};

export const signOut = () => {
  return () => {};
};

export const passwordReset = () => {
  return () => {};
};

export const passwordUpdate = () => {
  return () => {};
};
