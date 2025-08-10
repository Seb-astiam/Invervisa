import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginDto } from "../services/auth.services";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
        <input formControlName="email" placeholder="correo" />
        <input formControlName="password" placeholder="contraseña"/>
        <button type="submit">Entrar</button>
    </form>
    `
})
export class LoginPage {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);

    form = this.fb.group({
        email: this.fb.control<string>('', [Validators.required, Validators.email]),
        password: this.fb.control<string>('', [Validators.required]),
    });

    submit() {
        if(this.form.invalid) return;

        this.auth.login(this.form.getRawValue() as LoginDto).subscribe({
            next: () => this.router.navigate(['/entrada']),
            error: () => alert('Credenciales incorrectas')
        });
    }
}
