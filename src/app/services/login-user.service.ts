import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient) {}

  private user?: User;

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

}
