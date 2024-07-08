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
    const userR: userRoom = {
      id : user.id,
      name : user.name,
      photoUrl : user.photoUrl
    }
    if (user != null && user != undefined) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.setItem('token', user.idToken);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        this.clearUser();
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
