import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUserService } from './login-user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDbService {

  constructor(private http : HttpClient, private router : Router) { }

   loginService = inject(LoginUserService);

  apiUrl = "http://localhost:4000/users";


  postUser(body : User) : void {
    const user = this.http.post<User>(this.apiUrl, body).subscribe((usr) => usr != null ? usr : null);
    if (user != null) {
      this.loginService.setUser(body);
      this.router.navigate(['']);
    }
  }


}
