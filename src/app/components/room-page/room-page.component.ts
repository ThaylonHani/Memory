import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {

}
