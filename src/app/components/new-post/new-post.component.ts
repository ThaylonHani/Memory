import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  @Output() handleCloseModal = new EventEmitter<boolean>();
  
  formPost!: FormGroup;
  postModal: boolean = false;
  inputPostDescription: string = '';
  inputPostContent: string = '';
  
  ngOnInit() {
    this.formPost = new FormGroup({
      content: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }

  handlePost(): void {
   
  }
  
}
