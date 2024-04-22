import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MemoriesRoomComponent } from './components/rooms/memories-room.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    data: { user: 'amor' }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'rooms',
    component: MemoriesRoomComponent
  }
];
