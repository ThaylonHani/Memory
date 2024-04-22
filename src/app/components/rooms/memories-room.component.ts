import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../../services/login-user.service';

@Component({
  selector: 'app-memories-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memories-room.component.html',
  styleUrl: './memories-room.component.css'
})

export class MemoriesRoomComponent implements OnInit {

  constructor(private logService: LoginUserService) {  };
  user: any;
  ngOnInit() {
    this.user = this.logService.getUser();
    console.log("Se tudo deu certo aparecerá o usuário a seguir");
    console.log(this.user);
  }
}
