import axios, { AxiosInstance } from "axios";

export const signUpAPI: AxiosInstance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signInAPI: AxiosInstance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
