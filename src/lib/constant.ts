export const API_URL_V1 = "http://localhost:5000/api/v1/";

export const REQUEST_CONFIG: RequestInit = {
  credentials: "include",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};
