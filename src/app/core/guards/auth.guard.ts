import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(NavController);
  const user = authService.getUser();

  if (user?.uid) return true;

  router.navigateBack('/auth');
  return false;
};
