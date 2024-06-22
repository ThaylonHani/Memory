import { RoomsService } from './../../services/rooms/rooms.service';
import { CryptoService } from './../../services/crypto/crypto.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-room-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-room-modal.component.html',
  styleUrl: './create-room-modal.component.css',
})
export class CreateRoomModalComponent {
  constructor(
    private cryptoService: CryptoService,
    private roomsService: RoomsService,
    private router: Router
  ) {}

  @Output() handleCloseModal = new EventEmitter<boolean>();

  inputRoomName: string = '';
  formRoom!: FormGroup;
  enterRoom: boolean = false;
  user: User = JSON.parse(localStorage.getItem('user')!);

  ngOnInit() {
    this.formRoom = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  handleCreateButton(): void {
    this.enterRoom = false;
    console.log('create');
  }
  handleEnterButton(): void {
    this.enterRoom = true;
  }

  handleRooms(): void {
    let { name, password, confirmPassword } = this.formRoom.value;

    password = this.cryptoService.setSha256(password);

    const createRoom = this.roomsService.postRooms({
      name: name,
      photo: '',
      users: [
        {
          id: this.user.id,
          name: this.user.name,
          photo: this.user.photoUrl,
        },
      ],
    }).subscribe((room) => {
      if (room != null && room.id != null) {
        this.router.navigate([`room/${room.id}`])
      }
    });
  }
}
