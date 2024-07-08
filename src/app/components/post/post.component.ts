import { userRoom } from './../../models/user.model';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { UsersDbService } from '../../services/userDb/users-db.service';
import { PostsService } from '../../services/posts/posts.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  constructor(
    private userService: UsersDbService,
    private postService: PostsService
  ) {}
  like: boolean = false;
  comments: boolean = false;
  archive: boolean = false;
  userPage: User = JSON.parse(localStorage.getItem('user')!);

  userName!: string;
  userPhoto!: string;

  @Input() post!: Post;

  ngOnInit() {
    this.handleUser();
  }

  handleLike(post: Post): void {
    let usersList!: userRoom[];
    const userR: userRoom = {
      id: this.userPage.id,
      name: this.userPage.name,
      photoUrl: this.userPage.photoUrl,
    };
    this.postService;

    this.postService.getPost(post.id).subscribe((pst) => {
      usersList = pst.likes ? pst.likes : [];
    });
    setTimeout(() => {
      this.like = !this.like;
      this.postService.likePost(post, [...usersList, userR]).subscribe();
    }, 100);
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
