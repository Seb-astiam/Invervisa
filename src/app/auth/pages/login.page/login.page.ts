import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginDto } from "../../services/auth.services";
import { Router } from "@angular/router";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.page.html',
    styleUrl: './login.page.css'
})
export class LoginPage {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);
    showPassword = false;
   loading = false

    form = this.fb.group({
        email: this.fb.control<string>('', [Validators.required, Validators.email]),
        password: this.fb.control<string>('', [Validators.required]),
    });

    submit() {
        if(this.form.invalid) return;

        this.auth.login(this.form.getRawValue() as LoginDto).subscribe({
            next: () => this.router.navigate(['/productos']),
            error: () => alert('Credenciales incorrectas')
        });
    }

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }
}
