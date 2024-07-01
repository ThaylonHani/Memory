import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,) { }


  getPostUserInfo(id: string): Observable<Post> {
      return this.http.get<Post>(`http://localhost:4000/posts/${id}?_embed=user`)
  }

  setPost(body: Post): void{
    this.http.post<Post>("http://localhost:4000/posts?_embed=users", body)
  }

}
