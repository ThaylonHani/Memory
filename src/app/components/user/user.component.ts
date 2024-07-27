import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { LoginUserService } from '../../services/loginUser/login-user.service';
import { CryptoService } from '../../services/crypto/crypto.service';
import { Component } from '@angular/core';
import { UsersDbService } from '../../services/userDb/users-db.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private cryptoService: CryptoService,
    private logService: LoginUserService,
    private userService: UsersDbService
  ) {}

  pass: string = '';
  changePassModal: boolean = false;
  user: User = JSON.parse(localStorage.getItem('user')!);
  formPass!: FormGroup;

  inputOldPass: string = "";
  inputNewPass: string = "";
  inputConfirmNewPass: string = "";

  ngOnInit() {
    this.handlePass();
    this.formPass = new FormGroup({
      oldPass: new FormControl('', [Validators.required]),
      newPass: new FormControl('', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}')]),
      confirmNewPass: new FormControl('', [])
    });
  }

  handlePass(): void {
    const passDecrypt = this.cryptoService.decipher(
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
    const photoInput = <HTMLInputElement>document.getElementById('file');
    const reader = new FileReader();
    const file = photoInput.files![0];
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      let imageType = file.type;
      let imageSize = file.size;
      console.log(file);
      const allowedImageMatch =
        imageType != 'image/jpeg' &&
        imageType != 'image/jpg' &&
        imageType != 'image/png';
      console.log(allowedImageMatch);
      if (imageSize > 1e6) {
        alert('imagem deve ter tamanho menor ou igual a 1Mb');
      } else if (allowedImageMatch) {
        alert('Apenas arquivo do tipo .jpeg/.jpg e .png são permitidas');
      } else {
        this.userService.editPhoto(reader.result, this.user.id);
      }
    };
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
  
  changePassword(){
    let {oldPass, newPass, confirmNewPass} = this.formPass.value;
    const handlePass = this.cryptoService.confirmCipher(this.user.idToken, oldPass, this.user.name);
    if(handlePass){
      if(newPass == confirmNewPass){
        const cypherPass = this.cryptoService.setCipher(confirmNewPass,this.user.name);
        this.userService.editPass(this.user.id, cypherPass);
        alert("Senha alterada!");
        this.logService.clearUser();
      } else {
        alert("Nova senha errada.")
      }
    } else {
      alert("Senha errada");
    }
  }

  handleLogOut(): void {
    this.logService.clearUser();
  }
}
