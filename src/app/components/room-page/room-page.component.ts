import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomsService } from '../../services/rooms/rooms.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { NewPostComponent } from "../new-post/new-post.component";
@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [PostComponent, CommonModule, RouterLink, RoomPageComponent, NewPostComponent],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {
  constructor(private route: ActivatedRoute, private roomService: RoomsService, private router: Router) {
    this.getRoomInfo();
    this.roomNotExists();
  }

  createPost: boolean = false;
  roomId: string = this.route.snapshot.params['id'];
  roomName!: string;
  roomPhoto?: string;
  roomPosts?: Post[];
  
  getRoomInfo():void {
    this.roomService.getRoomPosts(this.roomId).subscribe((room) =>
      {
      this.roomName = room.name;
      this.roomPhoto = room.photo;
      this.roomPosts = room.posts;
    }
    );
  }
  roomNotExists() {
    setTimeout(() => {
      if(this.roomName == null && this.roomPhoto == null && this.roomPhoto == null){
        this.router.navigateByUrl("/rooms");
      }
    },200)
  }

  closeModal(event: boolean){
    let bodyStyleOverflow = document.body.style;
    this.createPost = event;
      this.createPost
        ? (bodyStyleOverflow.overflow = 'hidden')
        : (bodyStyleOverflow.overflow = 'inherit');
   this.getRoomInfo(); 
  }

  openModal(){
    this.createPost = true;
    let bodyStyleOverflow = document.body.style;
      this.createPost
        ? (bodyStyleOverflow.overflow = 'hidden')
        : (bodyStyleOverflow.overflow = 'inherit');
  }

}
