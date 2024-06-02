import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersDbService } from '../../services/users-db.service';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { CryptoService } from '../../services/crypto.service';
import { LoginUserService } from '../../services/login-user.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, GoogleSigninButtonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
  constructor(
    private http: HttpClient,
    private dbService: UsersDbService,
    private authService: SocialAuthService,
    private crypto: CryptoService,
    private logService : LoginUserService
  ) {}

  apiUrl = 'http://localhost:4000/users';
  passwordUser: string = '';
  users: User[] = [];
  userEmailExist: boolean = false;
  inputEmail: string = '';
  inputName: string = '';
  inputPass: string = '';
  inputConfirmPass: string = '';

  passwordErr: boolean = false;
  emailErr: boolean = false;
  nameErr: boolean = false;

  loading: boolean = false;
  googleLoading: boolean = false;

  createAccount(): void {
    this.confirmEmailExist(this.inputEmail);
    this.loading = true;
    setTimeout(() => {
      if (this.userEmailExist) {
        this.emailErr = this.userEmailExist;
        alert('Já existe um usuário com o email');
        this.loading = false;
      } else {
        this.passwordErr = this.confirmPassword(
          this.inputPass,
          this.inputConfirmPass
        );
        this.emailErr = this.inputEmail.length < 20;
        this.nameErr = this.inputName.length < 5;
        if (this.emailErr) {
          this.inputEmail = '';
          this.loading = false;
        } else if (this.nameErr) {
          this.inputName = '';
          this.loading = false;
        } else if (this.passwordErr) {
          this.inputConfirmPass = '';
          this.loading = false;
        } else {
          const separeteName = this.inputName.split(' ');
          this.dbService.postUser({
            id: Math.random().toString(),
            idToken: this.crypto.setCrypto(this.inputPass, this.inputName),
            name: this.inputName,
            email: this.inputEmail,
            photoUrl: '',
            firstName: separeteName[0],
            lastName: separeteName.pop() || '',
            provider: 'MEMORY',
          });
        }
      }
    }, 1500);
  }

  handleCreateWithGoogle(): void {
    this.authService.authState.subscribe((user) => {
      this.confirmEmailExist(user.email);
      setTimeout(() => {
        if (this.userEmailExist) {
          alert("Usuário já existe")
          this.emailErr = this.userEmailExist;
        } else {
          this.dbService.postUser(user);
        }
      }, 1500);
    });
  }

  confirmEmailExist(email: string): void {
    if (email == '') {
      this.userEmailExist = false;
    } else {
      this.logService.confirmEmail(email).subscribe((user) =>  this.userEmailExist = user != null && user.name != null);
    }
  }

  confirmPassword(pass: string, confirmPass: string): boolean {
    if (pass != confirmPass || pass.length < 8) {
      return true;
    } else {
      return false;
    }
  }
}
