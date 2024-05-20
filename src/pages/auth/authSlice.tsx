export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

export function getUserName(): string | null {
  return localStorage.getItem('username');
}

export function setUserDetails(token: string, username: string): void {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}
