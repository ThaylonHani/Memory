import { userRoom } from './../../models/user.model';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { UsersDbService } from '../../services/userDb/users-db.service';
import { PostsService } from '../../services/posts/posts.service';
import { User } from '../../models/user.model';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentModalComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  constructor(
    private userService: UsersDbService,
    private postService: PostsService
  ) {}
  like: boolean = true;
  comments: boolean = false;
  archive: boolean = false;
  userPage: User = JSON.parse(localStorage.getItem('user')!);
  usersList!: userRoom[];

  userName!: string;
  userPhoto!: string;

  @Input() post!: Post;

  ngOnInit() {
    this.handleUser();
    this.handleLike(this.post);
  }

  handleLike(post: Post): void {
    this.postService.getPost(post.id).subscribe((pst) => {
      this.like =
        pst.likes?.findIndex((user: userRoom) => user.id == this.userPage.id) !=
          -1 &&
        pst.likes?.findIndex((user: userRoom) => user.id == this.userPage.id) !=
          undefined;
      this.usersList = pst.likes ? pst.likes : [];
    });
  }

  handleLikeClick(post: Post): void {
    const userR: userRoom = {
      id: this.userPage.id,
      name: this.userPage.name,
      photoUrl: this.userPage.photoUrl,
    };
    this.postService.getPost(post.id).subscribe((pst) => {
      this.usersList = pst.likes ? pst.likes : [];
    });
    if (!this.like) {
      this.like = !this.like;
      setTimeout(() => {
        this.postService.likePost(post, [...this.usersList, userR]).subscribe();
      }, 100);
    } else {
      let id: number | undefined;
      setTimeout(() => {
        this.postService.getPost(post.id).subscribe((pst) => {
          id = pst.likes?.findIndex((user: userRoom) => {
            return user.id == this.userPage.id;
          });
        });
        this.usersList = this.usersList.splice(id!, 1);
        this.postService.unLikePost(post, this.usersList).subscribe();
        this.like = !this.like;
      }, 100);
    }
  }

  handleArchive(): void {
    this.archive = !this.archive;
  }

  handleComments(): void {
    let bodyStyleOverflow = document.body.style;
    this.comments = !this.comments;
    this.comments
      ? (bodyStyleOverflow.overflow = 'hidden')
      : (bodyStyleOverflow.overflow = 'inherit');
      this.postService.getPostComments(this.post.id).subscribe((post: Post) => {
        console.log(post.comments);
      });
    }
    
    handleCloseModalComments(modal: boolean){
    let bodyStyleOverflow = document.body.style;
      this.comments = modal;
      this.comments
        ? (bodyStyleOverflow.overflow = 'hidden')
        : (bodyStyleOverflow.overflow = 'inherit');

  }

  handleUser() {
    this.userService.getUserById(this.post.userId).subscribe((user) => {
      this.userName = user.name;
      this.userPhoto = user.photoUrl;
    });
  }
}
