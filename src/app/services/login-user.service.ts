import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient, private router: Router) {}

  apiUrl = 'http://localhost:4000/users';

  setUser(user: User) {
    if (user != null && user != undefined) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.setItem('token', user.idToken);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }, 60000 * 60);
    }
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getUser(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `/?name=${name}`);
  }

  confirmEmail(email: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/?email=${email}`);
  }
}
