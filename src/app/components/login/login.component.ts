import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { LoginUserService } from '../../services/loginUser/login-user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto/crypto.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private logService: LoginUserService,
    private http: HttpClient,
    private crypto: CryptoService
  ) {}

  apiUrl = 'http://localhost:4000/users';

  exist: boolean = false;
  loadingWithGoogle: boolean = false;
  loading: boolean = false;
  localUser!: string;

  inputName: string = '';
  inputPass: string = '';

  user?: SocialUser | User;

  err: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('user') != null) this.router.navigate(['rooms']);
  }

  handleLoginGoogle() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      setTimeout(() => {
        if (user) {
          this.logService.setUser(user);
        }
      }, 100);
      this.handleUserExists(user.id);
    });
  }

  handleLogin() {
    this.loading = true;
    if (this.inputName.trim().length != 0) {
      this.logService
        .getUser(this.inputName)
        .subscribe((user) => this.logService.setUser(user[0]));
    } else {
      this.err = true;
      this.inputName = '';
      this.inputPass = '';
    }
    setTimeout(() => {

      if (localStorage.getItem('user') != null) {
        const user: User = JSON.parse(localStorage.getItem('user')!);
        const decrypt = this.crypto.decipher(user.idToken, user.name);
        const crypto = this.crypto.setCipher(this.inputPass, this.inputName);
        if (this.crypto.confirmCipher(crypto, decrypt, this.inputName)) {
          this.router.navigate(['rooms']);
        } else {
          this.err = true;
          this.inputName = '';
          this.inputPass = '';
        }
      } else {
        this.err = true;
        this.inputName = '';
        this.inputPass = '';
      }
    this.loading = false;
    }, 1000);
  }

  handleUserExists(userId: string): void {
    this.loadingWithGoogle = true;
    this.http
      .get<User>(this.apiUrl + `/${userId}`)
      .subscribe((user) => (this.exist = user != null));
    setTimeout(() => {
      if (this.exist == true) {
        this.router.navigate(['rooms']);
      } else {
        this.router.navigate(['create_account']);
      }
    }, 1000);
  }
}
