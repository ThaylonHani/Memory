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

}
