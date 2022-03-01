import axios, { AxiosInstance } from "axios";

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  headers: {
    "x-rapidapi-host": `${process.env.NEXT_PUBLIC_HOST}`,
    "x-rapidapi-key": `${process.env.NEXT_PUBLIC_KEY}`,
  },
});

export { signUpAPI, signInAPI } from "./auth";
export { fetchFavoriteLists } from "./favorite";
