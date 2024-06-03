import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MemoriesRoomComponent } from './components/rooms/memories-room.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { userAuthenticatedGuard } from './services/guards/user-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create_account',
    component: CreateAccountComponent,
  },
  {
    path: 'rooms',
    component: MemoriesRoomComponent,
    canActivate: [userAuthenticatedGuard]
  }
];
