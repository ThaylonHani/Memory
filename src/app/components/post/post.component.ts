import { userRoom } from './../../models/user.model';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommentPost, Post } from '../../models/post.model';
import { UsersDbService } from '../../services/userDb/users-db.service';
import { PostsService } from '../../services/posts/posts.service';
import { User } from '../../models/user.model';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { CommentService } from '../../services/comments/comment.service';
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
    private postService: PostsService,
    private commentService: CommentService
  ) {}
  like: boolean = true;
  comments: boolean = false;
  userPage: User = JSON.parse(localStorage.getItem('user')!);
  usersList!: userRoom[];
  commentsPost?: CommentPost[];
  errImage: boolean = false;
  comment?: CommentPost;
  descriptionOpen: boolean = false;

  userName!: string;
  userPhoto!: string;

  @ViewChild("descriptionContent") descriptionContent!: ElementRef<HTMLParagraphElement>;
  @ViewChild("postMenuModal") postMenuModal!: ElementRef<HTMLParagraphElement>;

  @Output() deletePost  = new EventEmitter<boolean>();
  @Input() post!: Post;

  ngOnInit() {
    this.handleUser();
    this.handleLike(this.post);
    this.handleNoPhoto();
    this.showCommentInPost();
  }

  handleLike(post: Post): void {
    this.postService.getPost(post.id!).subscribe((pst) => {
      this.like =
        pst.likes?.findIndex((user: userRoom) => user.id == this.userPage.id) !=
          -1 &&
        pst.likes?.findIndex((user: userRoom) => user.id == this.userPage.id) !=
          undefined;
      this.usersList = pst.likes ? pst.likes : [];
    });
  }

  showCommentInPost(){
    this.postService.getComments(this.post.id!).subscribe((post) => {
      this.comment = post.comments![0];
    })
  }

  handleNoPhoto() {
    if(!this.post.content){
      setTimeout(() => {
        if(!this.post.content){
          document.getElementById("imageLoading")!.style.display = "none";
          this.errImage = true;
        }
      },3000)
    }
  }

  handleLikeClick(post: Post): void {
    const userR: userRoom = {
      id: this.userPage.id,
      name: this.userPage.name,
      photoUrl: this.userPage.photoUrl,
    };
    this.postService.getPost(post.id!).subscribe((pst) => {
      this.usersList = pst.likes ? pst.likes : [];
    });
    if (!this.like) {
      this.like = !this.like;
      setTimeout(() => {
        this.postService.likePost(post, [...this.usersList, userR]).subscribe();
      }, 100);
    } 
    else {
      let id: number;
      this.postService.getPost(post.id!).subscribe((pst) => {
        id = pst.likes!.findIndex((user: userRoom) => {
          return user.id == this.userPage.id;
        });
      });
      setTimeout(() => {
        this.usersList.splice(id, 1);
        this.postService.unLikePost(post, this.usersList).subscribe();
        this.like = !this.like;
      }, 100);
    }
  // }
}

  handleDescription(): void {
    let descriptionStyle = this.descriptionContent.nativeElement.style; 
    if(!this.descriptionOpen){
      descriptionStyle.whiteSpace = "inherit";
      descriptionStyle.height = "100%";
      descriptionStyle.overflow = "scroll";
    } else {
      descriptionStyle.whiteSpace = "nowrap";
      descriptionStyle.height = "inherit";
      descriptionStyle.overflow = "hidden";
    }
    this.descriptionOpen = !this.descriptionOpen;
  }

  handleComments(): void {
    let bodyStyleOverflow = document.body.style;
    this.comments = !this.comments;
    this.comments
      ? (bodyStyleOverflow.overflow = 'hidden')
      : (bodyStyleOverflow.overflow = 'inherit');
      this.postService.getComments(this.post.id!).subscribe((post: Post) => {
        if(post.comments != undefined && post.comments.length > 0  ){
            this.commentsPost = post.comments;
        } else {
          this.commentsPost = [];
        }
      });
    }
    
    handleCloseModalComments(modal: boolean){
      let bodyStyleOverflow = document.body.style;
      this.comments = modal;
      this.comments
      ? (bodyStyleOverflow.overflow = 'hidden')
      : (bodyStyleOverflow.overflow = 'inherit');

  }

  handleMenuPost(): void{
    let display = this.postMenuModal.nativeElement.style.display;
    if(display == 'flex'){
      this.postMenuModal.nativeElement.style.display = 'none';
    } else {
      this.postMenuModal.nativeElement.style.display = 'flex'
    }
  }
  
  handleUser() {
    this.userService.getUserById(this.post.userId).subscribe((user) => {
      this.userName = user.name;
      this.userPhoto = user.photoUrl;
    });
  }

  handleDeletePost(postId: string) {
    this.postService.deletePost(postId);
    this.deletePost.emit(true);
  }
  
}
