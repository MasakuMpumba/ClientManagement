import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: string;
  user: any;

  // initializing content header for server
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user) {

    return this.http.post('http://localhost:3000/users/register', user,
      { headers: this.contentHeader });
  }

  authenticateUser(user) {

    return this.http.post('http://localhost:3000/users/authenticate', user,
      { headers: this.contentHeader });
  }

  getProfile() {
    this.loadToken();
    this.contentHeader.append('Authorization', this.authToken);

    return this.http.get('http://localhost:3000/users/profile',
      { headers: this.contentHeader });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token); // Check this line
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
