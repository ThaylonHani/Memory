import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, enterRoom } from '../../models/room.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { userRoom } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.api}/rooms`

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl)
  }

  getRoomId(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`)
  }

  getRoomPosts(id:string): Observable<Room>{
    return this.http.get<Room>(`${this.apiUrl}/${id}?_embed=posts`);
  }

  postRooms(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  enterRoom(room: enterRoom, users: userRoom[]){

    console.log(users);

      // return this.http.patch<Room>(`${this.apiUrl}/${room.id}`, {users: users } )

  }

}
