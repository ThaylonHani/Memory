import { HeaderRoomsComponent } from './../header-rooms/header-rooms.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ListRoomsComponent } from '../list-rooms/list-rooms.component';
import { CreateRoomModalComponent } from '../create-room-modal/create-room-modal.component';
import { LoginUserService } from '../../services/loginUser/login-user.service';

@Component({
  selector: 'app-memories-room',
  standalone: true,
  imports: [CommonModule, HeaderRoomsComponent, ListRoomsComponent, CreateRoomModalComponent],
  templateUrl: './memories-room.component.html',
  styleUrl: './memories-room.component.css'
})

export class MemoriesRoomComponent implements OnInit {

  constructor(private logService: LoginUserService) {  };

  modal: boolean = false;
  user : User = JSON.parse(sessionStorage.getItem('user') || '') ;
  createRoom: boolean = false;

  ngOnInit() {
  }

  openModal(modal: boolean) {
    this.modal = modal;
  }
  closeModal(modal: boolean) {
    this.modal = modal;
  }

}
