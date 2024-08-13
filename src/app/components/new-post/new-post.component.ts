import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts/posts.service';
import { Post } from "../../models/post.model";
import { userRoom } from '../../models/user.model';
import { Room } from '../../models/room.model';
@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  constructor(private postService: PostsService){}

  @Output() handleCloseModal = new EventEmitter<boolean>();
  @Input() roomId! : string;
  
  formPost!: FormGroup;
  postModal: boolean = false;
  inputPostDescription: string = '';
  inputPostContent: string = '';
  contentPhoto!: string | ArrayBuffer | null;
  postBody!: Post;  
  user: userRoom = JSON.parse(sessionStorage.getItem("user")!);

  ngOnInit() {
    this.formPost = new FormGroup({
      content: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }

  handlePost(): void {
    let {description} = this.formPost.value;
    this.postBody = {
      content: String(this.contentPhoto),
      description: description ,
      roomId: this.roomId,
      userId: this.user.id!,
    }
    this.postService.setPost(this.postBody).subscribe(post => console.log(post));
    this.contentPhoto = "";
    this.handleCloseModal.emit(false);
  }
  handlePhoto() {
    const photoInput = <HTMLInputElement>document.getElementById('content');
    const reader = new FileReader();
    const file = photoInput.files![0];
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      let imageType = file.type;
      const allowedImageMatch =
      imageType != 'image/jpeg' &&
      imageType != 'image/jpg' &&
      imageType != 'image/png';
      if(allowedImageMatch){
        alert("Apenas arquivos jpeg, jpg e png são permitidos");
      } else {
        this.contentPhoto = reader.result;
      }
    };
  }
  
}
