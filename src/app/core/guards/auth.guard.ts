import { inject } from '@angular/core/';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const user = authService.getUser();
  console.log(user);

  return user.uid ? true : false;
};
