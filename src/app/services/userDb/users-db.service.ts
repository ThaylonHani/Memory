import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUserService } from '../loginUser/login-user.service';
import { Observable } from 'rxjs';

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

  editPhoto(photo: string | ArrayBuffer | null, userId: string) {
    this.http.patch(this.apiUrl + `/${userId}`, { "photoUrl": `${photo}` }).subscribe((user) => console.log(user));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/${id}`);
  }

}
