import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangePasswordDto, UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-account-security',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.css'
})
export class AccountSecurityComponent {
  private api = inject(UsersService);
  private fb = inject(FormBuilder);

  saving = false;
  msg = '';

  form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  change() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true; this.msg = '';
    this.api.changePassword(this.form.getRawValue() as ChangePasswordDto).subscribe({
      next: _ => { this.msg = 'Contraseña actualizada'; this.saving = false; this.form.reset(); },
      error: e => { this.msg = 'Error: ' + (e?.error?.message || ''); this.saving = false; }
    });
  }
}
