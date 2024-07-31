import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentPost } from '../../models/post.model';
import { userRoom } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comments/comment.service';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css'
})
export class CommentModalComponent {
  
  constructor(private commentService: CommentService, private postService: PostsService){}
  
  @Output() modalVisible = new EventEmitter<boolean>;
  @Input() commentVisible :boolean = false ;
  @Input() comments? : CommentPost[];
  @Input() postId! : string | undefined;
  user : userRoom = JSON.parse(localStorage.getItem('user')!);
  comment: string = "";
  closeModal() {
    this.modalVisible.emit(false);
  }

  sendComment() {
    this.commentService.newComment({
      userId: this.user.id,
      name: this.user.name,
      photoUrl: this.user.photoUrl || "https://picsum.photos/64",
      text: this.comment,
      postId: this.postId!,
  }).subscribe(() => {
    this.comment = "";
    this.postService.getComments(this.postId!).subscribe((post) => {
      this.comments = post.comments
    })
  });
  }
}
