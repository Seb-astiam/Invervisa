import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService, RegisterDto } from "../services/auth.services";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
        <input formControlName="name" placeholder="nombre" />
        <input formControlName="email" placeholder="correo" />
        <input formControlName="password" placeholder="contraseña"/>
        <button type="submit">Registrar</button>
    </form>
    `
})
export class RegisterPage {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);

    form = this.fb.group({
        name: this.fb.control<string>('', [Validators.required]),
        email: this.fb.control<string>('', [Validators.required, Validators.email]),
        password: this.fb.control<string>('', [Validators.required]),
    });

    submit() {
        if(this.form.invalid) return;
         this.auth.register(this.form.getRawValue() as RegisterDto).subscribe({
                    next: () => this.router.navigate(['/productos']),
                    error: () => alert('Credenciales incorrectas')
                });
    }
}