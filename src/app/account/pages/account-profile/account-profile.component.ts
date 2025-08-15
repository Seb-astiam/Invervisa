import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Me, UpdateMeDto, UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-account-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.css'
})
export class AccountProfileComponent {
  private api = inject(UsersService);
  private fb = inject(FormBuilder);

  loading = true;
  saving = false;
  msg = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    this.api.getMe().subscribe({
      next: (me: Me) => {
        this.form.patchValue({ name: me.name, email: me.email });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true; this.msg = '';
    this.api.updateMe(this.form.getRawValue() as UpdateMeDto).subscribe({
      next: () => { this.msg = 'Perfil actualizado'; this.saving = false; },
      error: (e) => { this.msg = 'Error al actualizar: ' + (e?.error?.message || ''); this.saving = false; }
    });
  }
}
