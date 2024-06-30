import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MemoriesRoomComponent } from './components/rooms/memories-room.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { userAuthenticatedGuard } from './services/guards/user-authenticated.guard';
import { UserComponent } from './components/user/user.component';
import { RoomPageComponent } from './components/room-page/room-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
    canActivate: [userAuthenticatedGuard],
    pathMatch: 'full',
  },
  {
    path: 'rooms/:id',
    component: RoomPageComponent,
    canActivate: [userAuthenticatedGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [userAuthenticatedGuard],
  },
];
