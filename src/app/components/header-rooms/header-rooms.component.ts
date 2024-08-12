import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-rooms',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header-rooms.component.html',
  styleUrl: './header-rooms.component.css'
})
export class HeaderRoomsComponent {

  constructor(private router: Router) {}
  @Output() handleOpenModal = new EventEmitter<boolean>();

  bypass: boolean = false;
  modal: boolean = false;
  
  handleBypass() {
    this.bypass = !this.bypass;
  }

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
