import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService, RegisterDto } from "../../services/auth.services";
import { Router, RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: "./register.page.html",
    styleUrl: './register.page.css'
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