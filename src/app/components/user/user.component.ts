import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { LoginUserService } from '../../services/login-user.service';
import { CryptoService } from './../../services/crypto.service';
import { Component } from '@angular/core';
import { UsersDbService } from '../../services/users-db.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private cryptoService: CryptoService,
    private logService: LoginUserService,
    private userService: UsersDbService
  ) {
    this.handlePass();
  }

  pass: string = '';
  changePassModal: boolean = false;
  user: User = JSON.parse(localStorage.getItem('user')!);

  ngOnInit() {
    this.logService
      .getUserById(this.user.id)
      .subscribe((user) => this.logService.setUser(user));
  }

  handlePass(): void {
    const passDecrypt = this.cryptoService.decrypt(
      this.user.idToken,
      this.user.name
    );
    this.pass = passDecrypt;
  }

  handleChangePhoto() {
    const photoContainer = document.getElementById('editPhoto-container');
    photoContainer?.style.display == 'flex'
      ? (photoContainer!.style.display = 'none')
      : (photoContainer!.style.display = 'flex');
  }

  handlePhoto() {
    const photoInput = (<HTMLInputElement>document.getElementById('file'));
    const reader = new FileReader();
    const file = photoInput.files![0];
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      let imageType = file.type;
      let imageSize = file.size;
      console.log(file);
      const allowedImageMatch = imageType != "image/jpeg" && imageType != "image/jpg" && imageType != "image/png";
      console.log(allowedImageMatch);
      if (imageSize > 1e6) {
        alert("imagem deve ter tamanho menor ou igual a 1Mb")
      }
      else if (allowedImageMatch) {
        alert("Apenas arquivo do tipo .jpeg/.jpg e .png são permitidas");
      }
      else {
        this.userService.editPhoto(reader.result, this.user.id)
      }
    }
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

  handleChangePasswordModal() {
    this.changePassModal = !this.changePassModal;
  }

  handleLogOut(): void {
    this.logService.clearUser();
  }
}
