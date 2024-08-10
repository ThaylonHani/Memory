import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUserService } from '../loginUser/login-user.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersDbService {

  constructor(private http : HttpClient, private router : Router) { }

   loginService = inject(LoginUserService);

  apiUrl = `${environment.api}/users`;


  postUser(body : User) : void {
    const user = this.http.post<User>(this.apiUrl, body).subscribe((usr) => usr != null ? usr : null);
    if (user != null) {
      this.loginService.setUser(body);
      this.router.navigate(['']);
    }
  }

  editPhoto(photo: string | ArrayBuffer | null, userId: string) {
    this.http.get<User>(this.apiUrl + `${userId}?_embed=comments`).subscribe((comment) => console.log(comment));
    this.http.patch<User>(this.apiUrl + `/${userId}`, { "photoUrl": `${photo}` }).subscribe((user) => {
      if(user != null){
        this.loginService.setUser(user);
      }
    });
  }
  
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/${id}`);
  }
  
  editPass(userId: string, cypherPass: string ){
    this.http.patch(this.apiUrl + `/${userId}`, { "idToken": `${cypherPass}` }).subscribe((user) => console.log(user));
  }
  
}
