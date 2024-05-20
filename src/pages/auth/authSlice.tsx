import { ILoginDetails } from "../../interfaces/login-details.interface";

// check user login to the system or not by checking token value
export function isAuthenticated(): boolean {
  return !!(localStorage.getItem('token') && localStorage.getItem('token') != undefined && localStorage.getItem('token') != null);
}

//  get username from local storage
export function getUserName(): string | null {
  return localStorage.getItem('username');
}

// set user detils in local storage
export function setUserDetails(loginDetails: ILoginDetails): void {
  localStorage.setItem('token', loginDetails.access_token);
  localStorage.setItem('username', loginDetails.name);
}

// clear local storage on logout
export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}
