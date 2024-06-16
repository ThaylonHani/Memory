import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { LoginUserService } from '../../services/login-user.service';
import { CryptoService } from './../../services/crypto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private cryptoService: CryptoService,
    private logService: LoginUserService
  ) {
    this.handlePass();
  }

  pass: string = '';

  user: User = JSON.parse(localStorage.getItem('user')!);


  ngOnInit() {
    this.logService.getUserById(this.user.id).subscribe((user) =>  this.logService.setUser(user));
  }

  handlePass(): void {
    const passDecrypt = this.cryptoService.decrypt(this.user.idToken, this.user.name);
    this.pass = passDecrypt;
  }

  handleChangePhoto() {
    const photoContainer = document.getElementById("editPhoto-container");
    photoContainer?.style.display == 'flex' ? photoContainer!.style.display = 'none' : photoContainer!.style.display = 'flex';

  }

  handlePhoto(photo: string) {
    this.logService.editPhoto(photo, this.user.id);
  }

  handleSeePass(): void {
    const passInput = document.getElementById('pass');
    const passVisible = document.getElementById('seePassOff');
    const passInvisible = document.getElementById('seePassOn');
    if (passInput?.getAttribute('type') === 'text') {
      passInput?.setAttribute('type', 'password');
      passVisible!.style.display = 'inherit';
      passInvisible!.style.display = 'none';
    } else {
      passVisible!.style.display = 'none';
      passInvisible!.style.display = 'inherit';
      passInput?.setAttribute('type', 'text');
    }
  }

  handleChangePassword() {
    const passModal = document.getElementById("changePassModal");
  }

  handleLogOut(): void {
    this.logService.clearUser();
  }
}
