import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment/enviroment';

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API = environment.apiUrl + '/auth';

    private authUser = signal<AuthResponse['user'] | null>(null);
    user = this.authUser.asReadonly();

    constructor(private http: HttpClient) {
        const saved = localStorage.getItem('auth_user');
        if (saved) { this.authUser.set(JSON.parse(saved)) }
    }

    login(data: LoginDto) {
        return this.http.post<AuthResponse>(`${this.API}/login`, data).pipe(
            tap((res) => {
                localStorage.setItem('auth_token', res.access_token);
                localStorage.setItem('auth_user', JSON.stringify(res.user))
                this.authUser.set(res.user)
            })
        );
    }

    register(data: RegisterDto) {
        return this.http.post<AuthResponse>(`${this.API}/register`, data).pipe(
            tap((res) => {
                localStorage.setItem('auth_token', res.access_token);
                localStorage.setItem('auth_user', JSON.stringify(res.user))
                this.authUser.set(res.user)
            })
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        this.authUser.set(null);
        
    }

    get token() {
        return localStorage.getItem('auth_token');
    }

    isAuthenticated() {
        return !!this.token
    }

}