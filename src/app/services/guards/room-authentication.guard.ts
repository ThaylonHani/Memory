import { ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import { RoomsService } from '../rooms/rooms.service';
import { inject } from '@angular/core';

export const roomAuthenticationGuard: CanActivateFn = (route, state) => {
  const roomsService = inject(RoomsService);
  const router = inject(Router);

  const localData = JSON.parse(localStorage.getItem('user')!);
  const id = route.params['id'];

  roomsService.getRoomId(id).subscribe((room) => {
    if (room.users.find((user) => user.id == localData.id)) {
      return true
    } else {
      router.navigate(['rooms']);
      return false
    }
  })

  return true;
  // roomsService.getRoomId()

};
