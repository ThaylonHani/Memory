import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient, private router: Router) {}

  apiUrl = 'http://localhost:4000/users';

  setUser(user: User) {
    if (user != null && user != undefined) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.setItem('token', user.idToken);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        this.clearUser();
      }, 60000 * 60);
    }
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  getUser(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `/?name=${name}`);
  }

  confirmEmail(email: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/?email=${email}`);
  }


  // handleLogin(emailExists) {
  //   if (emailExists) {
  //     this.emailErr = this.userEmailExist;
  //     alert('Já existe um usuário com o email');
  //     this.loading = false;
  //   } else {
  //     this.passwordErr = this.confirmPassword(
  //       this.inputPass,
  //       this.inputConfirmPass
  //     );
  //     this.emailErr = this.inputEmail.length < 20;
  //     this.nameErr = this.inputName.length < 5;
  //     if (this.emailErr) {
  //       this.inputEmail = '';
  //       this.loading = false;
  //     } else if (this.nameErr) {
  //       this.inputName = '';
  //       this.loading = false;
  //     } else if (this.passwordErr) {
  //       this.inputConfirmPass = '';
  //       this.loading = false;
  //     } else {
  //       const separeteName = this.inputName.split(' ');
  //       this.dbService.postUser({
  //         id: Math.random().toString(),
  //         idToken: this.crypto.setCrypto(this.inputPass, this.inputName),
  //         name: this.inputName,
  //         email: this.inputEmail,
  //         photoUrl: '',
  //         firstName: separeteName[0],
  //         lastName: separeteName.pop() || '',
  //         provider: 'MEMORY',
  //       });
  //     }
  //   }
  // }


}
