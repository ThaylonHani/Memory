import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomsService } from '../../services/rooms/rooms.service';
import { Room } from '../../models/room.model';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.css'
})
export class ListRoomsComponent {

  constructor(private roomsService: RoomsService) {
    this.getRooms();
  }

  items: Room[] = [];

  getRooms() {
    const userId = (JSON.parse(sessionStorage.getItem("user")!).id);
    this.roomsService.getRooms().subscribe((rooms) => {
      this.items = rooms.filter((room) => room?.users.find((user) => user.id == userId))
    });
  }
}
