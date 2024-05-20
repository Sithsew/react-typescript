import { ILoginDetails } from "../../interfaces/login-details.interface";

// check user login to the system or not
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

//  get username from local storage
export function getUserName(): string | null {
  return localStorage.getItem('username');
}

// set user detils in local storage
export function setUserDetails(loginDetails: ILoginDetails): void {
  localStorage.setItem('token', loginDetails.token);
  localStorage.setItem('username', loginDetails.username);
}

// clear local storage on logout
export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}
