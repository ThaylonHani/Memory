import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { LoginUserService } from '../../services/login-user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private logService: LoginUserService,
    private http: HttpClient
  ) {}
  apiUrl = "http://localhost:4000/users"
  exist: boolean = false;
  loading: boolean = false;
  isTrue?: boolean;
  user!: SocialUser;
  loggedIn!: boolean;
  userList: User[] = [
    {
      id: '',
      token: '',
      idToken: '',
      email: '',
      name: '',
      photoUrl: '',
      firstName: '',
      lastName: '',
      provider: '',
    },
  ];
  ngOnInit() {}
  handleLogin() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.logService.setUser(user);
        this.handleUserExists(user.id)
    })
  }
  handleUserExists(userId: string): void {
    this.http.get<User>(this.apiUrl + `/${userId}`).subscribe((user) => this.exist = user != null);
    this.loading = true;
    setTimeout(() => {
      if (this.exist == true) {
        this.router.navigate(['rooms']);
      }
      else {
        this.router.navigate(['']);
      }
    }, 3000);
    // this.exist ? console.log('user exists') : console.log("user does not exist")
  }
}
