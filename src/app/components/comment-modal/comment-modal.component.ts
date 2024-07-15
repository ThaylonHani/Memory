import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.css'
})
export class CommentModalComponent {

  @Output() modalVisible = new EventEmitter<boolean>;
  @Input() commentVisible :boolean = false ;

  closeModal() {
    this.modalVisible.emit(false);
  }

}
