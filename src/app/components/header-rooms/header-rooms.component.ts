import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-rooms.component.html',
  styleUrl: './header-rooms.component.css'
})
export class HeaderRoomsComponent {
  hamburger: boolean = false;
  bypass: boolean = false;
  modal: boolean = false;
  handleMenu() {
    this.hamburger = !this.hamburger;
  }
  handleBypass() {
    this.bypass = !this.bypass
  }
  @Output() handleOpenModal = new EventEmitter<boolean>();

  handleModalRooms() {
    if (this.modal) {
      this.handleOpenModal.emit(false);
      this.modal = false;
    } else {
      this.handleOpenModal.emit(true);
      this.modal = true;
    }
  }

}
