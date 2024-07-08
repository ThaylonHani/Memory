import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms/rooms.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {
  constructor(private route: ActivatedRoute, private roomService: RoomsService) {
    this.getRoomInfo();
  }

  roomId: string = this.route.snapshot.params['id'];
  roomName!: string;
  roomPhoto?: string;
  roomPosts?: Post[];
  ngOnInit() {}


  getRoomInfo():void {
    this.roomService.getRoomPosts(this.roomId).subscribe((room) =>
    {
      this.roomName = room.name;
      this.roomPhoto = room.photo;
      this.roomPosts = room.posts;
    }
    );
  }

}
