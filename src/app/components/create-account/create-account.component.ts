import { Component, EventEmitter, HostBinding, Input, Output, SimpleChanges} from '@angular/core';
import { User } from '../../models/user.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersDbService } from '../../services/userDb/users-db.service';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { CryptoService } from '../../services/crypto/crypto.service';
import { LoginUserService } from '../../services/loginUser/login-user.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {

  constructor(
    private dbService: UsersDbService,
    private authService: SocialAuthService,
    private crypto: CryptoService,
    private logService: LoginUserService
  ) {}
  
  @Input() height!:string;
  @Output() handleHeight = new EventEmitter<string>;
  @HostBinding('style.height') idHost!:string;

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
  formUser!: FormGroup;



  ngOnInit(): void {
    this.idHost = this.height;
    this.formUser = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern(/\s*[a-zA-Z]/g),
      ]),
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

  ngOnChanges(changes: SimpleChanges): void {
    document.getElementById("signup")!.style.scale = this.height == '10%' ? '1' : '1.3';
    this.idHost = this.height;
  }

  createAccount(): void {
    this.confirmEmailExist(this.inputEmail);
    this.loading = true;
    setTimeout(() => {
      if (!this.userEmailExist) {
        this.emailErr = this.userEmailExist;
        alert('Já existe um usuário com o email');
        this.loading = false;
      } 
      else {
        this.passwordErr = this.confirmPassword(this.inputPass, this.inputConfirmPass);
        this.nameErr = this.inputName.length < 5;
        if (this.emailErr || this.nameErr || this.passwordErr) {
          if (this.emailErr) this.inputEmail = '';
          if (this.nameErr) this.inputName = '';
          if (this.passwordErr) this.inputConfirmPass = '';
          this.loading = false;
        } else {
          const separeteName = this.inputName.split(' ');
          this.dbService.postUser({
            idToken: this.crypto.setCipher(this.inputPass, this.inputName),
            name: this.inputName,
            email: this.inputEmail,
            photoUrl: '',
            firstName: separeteName[0],
            lastName: separeteName.pop() || '',
            provider: 'MEMORY',
          });
        }
      }
    }, 500);
  }

  handleCreateWithGoogle(): void {
    this.authService.authState.subscribe((user) => {
      this.confirmEmailExist(user.email);
      setTimeout(() => {
        if (this.userEmailExist) {
          alert('Usuário já existe');
          this.emailErr = this.userEmailExist;
        } else {
          this.dbService.postUser(user);
        }
      }, 1500);
    });
  }

  async confirmEmailExist(email: string): Promise<void> {
    if (email.trim().length != 0) {
      this.logService.confirmEmail(email).subscribe((user) => {
        this.userEmailExist = user != null && user.name != null
      });
    } else {
      this.emailErr = true;
    }
  }
  confirmPassword(pass: string, confirmPass: string): boolean {
    if (pass != confirmPass || pass.length < 8) {
      return true;
    } else {
      return false;
    }
  }
  handleShowSignup(){
    this.handleHeight.emit("80%");
  }
}
