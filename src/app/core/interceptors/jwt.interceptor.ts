import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.services';

export const jwtInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const auth = inject(AuthService);
    const token = auth.token;

    if(token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
        });
    }

    return next(req)
}
