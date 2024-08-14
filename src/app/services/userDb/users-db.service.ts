import { Injectable, inject } from '@angular/core';
import { User, userRoom } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUserService } from '../loginUser/login-user.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CommentPost } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDbService {

  constructor(private http : HttpClient, private router : Router) { }

   loginService = inject(LoginUserService);

  apiUrl = `${environment.api}/users`;
  commentsUrl = `${environment.api}/comments`;

  postUser(body : User) : void {
    const user = this.http.post<User>(this.apiUrl, body).subscribe((usr) => usr != null ? usr : null);
    setTimeout(() => {
      if (user != null) {
        this.loginService.setUser(body);
        this.router.navigate(['/rooms']);
      } else {
        this.router.navigate([''])
      }
    },100)
  }

  editPhoto(photo: string | ArrayBuffer | null, userId: string) {
    let commentsId: String[] = [];
    this.http.get<CommentPost[]>(this.commentsUrl + `?userId=${userId}` ).subscribe((comments: CommentPost[]) => comments.forEach((comment) => commentsId.push(comment.id as string)));
    setTimeout(() => {
      commentsId.forEach((commentId) => {
        this.http.patch<CommentPost>(this.commentsUrl + `/${commentId}`, {"photoUrl": `${photo}`} ).subscribe((comment) => console.log(comment));
      })
    },100)
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
