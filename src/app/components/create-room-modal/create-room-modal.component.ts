import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-create-room-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-room-modal.component.html',
  styleUrl: './create-room-modal.component.css'
})
export class CreateRoomModalComponent {
  animationButton: boolean = false;
  handleCreateButton(): void {
    this.animationButton = false;
    console.log("create")
  }
  handleEnterButton(): void{
    this.animationButton = true;
  }
}
