import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const docenteGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isDocente()) return true;
  return router.createUrlTree(['/dashboard/catalogo']);
};

export const estudianteGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isEstudiante()) return true;
  return router.createUrlTree(['/dashboard']);
};
