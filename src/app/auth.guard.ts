// src/app/auth.guard.ts

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Hämtar JWT-token. Namnet "jwtToken" MÅSTE matcha hur du sparar den i AuthService.
  const token = localStorage.getItem('jwtToken');

  // Kontrollera om användaren redan är på inloggningssidan genom att jämföra state.url
  if (token || state.url === '/login') {
    return true; // Tillåt åtkomst om token finns eller om vi är på inloggningssidan
  } else {
    router.navigate(['/login']); // Omdirigera till inloggningssidan om ingen token finns
    return false;
  }
};

