import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentPost } from '../../models/post.model';
import { UsersDbService } from '../../services/userDb/users-db.service';
import { userRoom } from '../../models/user.model';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css'
})
export class CommentModalComponent {
  
  constructor(private userService: UsersDbService){}
  
  @Output() modalVisible = new EventEmitter<boolean>;
  @Input() commentVisible :boolean = false ;
  @Input() comments? : CommentPost[];

  name! : string;


  closeModal() {
    console.log(this.comments)
    this.modalVisible.emit(false);
  }
  handleUserName(id: string) : string {
  this.userService.getUserById(id).subscribe((user: userRoom) => {
    console.log(user);
      this.name =user.name
    })
      return this.name;
  }
}
