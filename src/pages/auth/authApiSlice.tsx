import { ILogin } from "../../interfaces/login.interface";
import { IUser } from "../../interfaces/user.interface";

const baseUrl = "http://localhost:3500/api";

const fetchJson = async (url: string, options: RequestInit) => {
  const response = await fetch(baseUrl + url, options);
  return response.json();
};

// login user to the system
export const login = async (credentials: ILogin) => {
  return fetchJson("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// register user in to the system
export const register = async (userData: IUser) => {
  return fetchJson("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
