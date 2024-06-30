import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  like: boolean = false;
  comments: boolean = false;
  archive: boolean = false;

  handleLike(): void {
    this.like = !this.like;
  }

  handleArchive(): void {
    this.archive = !this.archive;
  }

  handleComments(): void {
    this.comments = !this.comments;
  }

}
