import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User) {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );

    return this.http.get(
      `${this.url}/login?username=${user.username}&password=${user.password}`,
      { headers, responseType: 'text' }
    );
  }

  loggedin() {
    return !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['']);
  }
  getToken() {
    return localStorage.getItem('jwt');
  }
}
