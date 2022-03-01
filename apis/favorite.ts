import axios, { AxiosInstance } from "axios";

export const fetchFavoriteLists: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FIREBASE_URL}`,
});
