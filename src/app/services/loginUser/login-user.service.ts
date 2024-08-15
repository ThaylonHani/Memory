import { userRoom } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient, private router: Router) {}

  apiUrl = `${environment.api}/users`;

  setUser(user: User) {
    if (user != null && user != undefined) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.setItem('token', user.idToken);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  clearUser() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  getUser(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `/?name=${name}`);
  }

  confirmEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `/?email=${email}`);
  }
}
