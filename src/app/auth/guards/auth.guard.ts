import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if(!auth.isAuthenticated()) {
        router.navigate(['/auth/login']);
        return false
    } 
    return true
}