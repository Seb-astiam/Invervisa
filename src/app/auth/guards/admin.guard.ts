import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.services";

export const adminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const isAdmin = auth.user()?.role === 'admin';
    if (!isAdmin) {
        router.navigateByUrl('/')
        return false
    }
    return true
};