import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient,private router: Router) {}

  apiUrl = "http://localhost:4000/users";

  setUser(user: User) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.setItem('token', user.idToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getUser(idToken: string) :Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `/?idToken=${idToken}`);
  }
  confirmEmail(email: string): Observable<User>{
    return this.http.get<User>(this.apiUrl + `/?email=${email}`);
  }

}
