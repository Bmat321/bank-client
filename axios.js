import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://bank-api-866h.onrender.com/api",
  withCredentials: true,
});
// jdbc:mysql://sql10.freesqldatabase.com:3306/sql10665829
