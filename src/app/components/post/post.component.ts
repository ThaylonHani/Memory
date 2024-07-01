import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { UsersDbService } from '../../services/userDb/users-db.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  constructor(private userService: UsersDbService) {
  }

  like: boolean = false;
  comments: boolean = false;
  archive: boolean = false;

  userName!: string;
  userPhoto!: string;

  @Input() post!: Post;

  ngOnInit() {
    this.handleUser();
  }

  handleLike(): void {
    this.like = !this.like;
  }

  handleArchive(): void {
    this.archive = !this.archive;
  }

  handleComments(): void {
    this.comments = !this.comments;
  }

  handleUser() {
    this.userService.getUserById(this.post.userId).subscribe((user) => {
      this.userName = user.name;
      this.userPhoto = user.photoUrl;
    });
  }

}
