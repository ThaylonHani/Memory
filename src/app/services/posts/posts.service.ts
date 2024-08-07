import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { environment } from '../../../environments/environment.development';
import { userRoom } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,) { }

  apiUrl = `${environment.api}/posts`

  getPostUserInfo(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}?_embed=user`)
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
  
  getComments(id: string): Observable<Post>{
    return this.http.get<Post>(`${this.apiUrl}/${id}?_embed=comments`);
  }
  
  setPost(body: Post): Observable<Post>{
    // console.log(body);
    return this.http.post<Post>(`${this.apiUrl}?_embed=users`, body);
  }

  likePost(post: Post, user: userRoom[]): Observable<Post>{
    return this.http.patch<Post>(`${this.apiUrl}/${post.id}`, { likes: user });
  }

  unLikePost(post: Post, user: userRoom[]): Observable<Post>{
    console.log(user)
    return this.http.patch<Post>(`${this.apiUrl}/${post.id}`, { likes: user });
  }

  deletePost(postId:string): void {
    this.http.delete<Post>(`${this.apiUrl}/${postId}`).subscribe((post) => console.log(`Post ${post.id} excluido`));
  }
  
}
