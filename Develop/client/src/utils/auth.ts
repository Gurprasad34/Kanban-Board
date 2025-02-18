import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // Return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // Return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      // Return a value that indicates if the token is expired
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded?.exp ? decoded.exp < Date.now() / 1000 : false;
    } catch (err) {
      return true; // Assume expired if decoding fails
    }
  }

  getToken(): string {
    // Return the token from localStorage
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // Set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // Redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('id_token');
    // Redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
