import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.css'
})
export class ListRoomsComponent {
  items = [
    {
      id : "1",
      name: "Viagem",
      photo: "https://picsum.photos/seed/picsum/200"
    }
  ]
}
