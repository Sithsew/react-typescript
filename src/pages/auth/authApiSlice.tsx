const baseUrl = "http://localhost:3500/api";

const fetchJson = async (url: string, options: RequestInit) => {
  const response = await fetch(baseUrl + url, options);
  return response.json();
};

export const login = async (credentials: { email: string; password: string }) => {
  return fetchJson("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const register = async (userData: { name: string; email: string; password: string }) => {
  return fetchJson("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
