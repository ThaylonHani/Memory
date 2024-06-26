import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../../models/room.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }


  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>("http://localhost:4000/rooms")
  }

  getRoomId(id: string): Observable<Room> {
    return this.http.get<Room>("http://localhost:4000/rooms/" + id)
  }

  getRoomPosts(id:string): Observable<Room>{
    return this.http.get<Room>(`http://localhost:4000/rooms/${id}?_embed=posts`);
  }

  postRooms(room: Room): Observable<Room> {
    return this.http.post<Room>("http://localhost:4000/rooms", room);
  }


}
