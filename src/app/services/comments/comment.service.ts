import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CommentPost, Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  apiUrl = `${environment.api}/comments`

  
  newComment(comment: CommentPost): Observable<Post>{
    return this.http.post<Post>(`${this.apiUrl}/`, comment)
  }
}
