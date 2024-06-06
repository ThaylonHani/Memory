import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-room-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-room-modal.component.html',
  styleUrl: './create-room-modal.component.css'
})
export class CreateRoomModalComponent {
  @Output() handleCloseModal = new EventEmitter<boolean>();
  enterRoom: boolean = false;
  handleCreateButton(): void {
    this.enterRoom = false;
    console.log("create")
  }
  handleEnterButton(): void{
    this.enterRoom = true;
  }

}
