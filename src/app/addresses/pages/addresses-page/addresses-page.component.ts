import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService, Address } from '../../services/addresses.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addresses-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './addresses-page.component.html',
  styleUrl: './addresses-page.component.css'
})
export class AddressesPageComponent {
  private fb = inject(FormBuilder);
  private api = inject(AddressService);

  addresses: Address[] = [];
  loading = false;
  loadingList = true;
  busyId: string | null = null;
  msg = ''

  form = this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    isDefault: [false]
  });

  ngOnInit() {
    this.loadList()
  }

  loadList() {
    this.loadingList = true;
    this.api.getMine().subscribe({
      next: (r: Address[]) => { this.addresses = r; this.loadingList = false },
      error: () => { this.loadingList = false }
    });
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.msg = '';
    this.api.create(this.form.getRawValue() as Address).subscribe({
      next: () => {
        this.msg = 'Direccion creada';
        this.loading = false;
        this.form.reset({ isDefault: false });
        this.loadList();
      },
      error: (e) => {
        this.msg = 'Error al crear: ' + (e.error.message || '');
        this.loading = false;
      }
    });
  }

  setDefault(a: Address) {
    this.busyId = a.id;
    this.api.update(a.id, { isDefault: true }).subscribe({
      next: () => {
        this.busyId = null; this.loadList();
      },
      error: (e) => { 
        this.busyId = null; alert('Error: ' + e.error.message || '');
      }
    });
  }

  remove(a: Address) {
    if(!confirm('¿Eliminar esta dirección?')) return;
    this.busyId = a.id;
    this.api.remove(a.id).subscribe({
      next: () => { 
        this.busyId = null; 
        this.loadList(); 
      },
      error: (e) => { 
        this.busyId = null; 
        alert('Error: ' + (e.error.message || ''));
      }
    });
  }
}
