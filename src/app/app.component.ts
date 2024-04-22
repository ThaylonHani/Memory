// import { SocialAuthService, SocialLoginModule, SocialUser, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memory';

  // user!: any;
  loggedIn!: boolean;
  constructor() { }

  ngOnInit() {
    // this.user = userData?.extras.state;
    // this.user == undefined ? this.router.navigate(['/login']) : false;
  }
}
