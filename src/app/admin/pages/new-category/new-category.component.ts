import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CategoryService, CreateCategory } from "../../../categories/services/categories.service";

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
        <h2>Nueva Categoria</h2>
        <form [formGroup]="form" (ngSubmit)="save()">
            <label>Nombre</label>
            <input formControlName="name"/>
            <label>Descripción</label>
            <input formControlName="description"/> 
            <button type="submit" [disabled]="form.invalid || loading">Guardar</button>
            <a routerLink="/admin">Volver</a>
        </form>
        @if (msg) { <h3>{{ msg }}</h3> }
    `
})
export class NewCategoryComponent {
    private fb = inject(FormBuilder);
    private api = inject(CategoryService);

    loading = false;
    msg = '';
    form = this.fb.group({
        name: ['', Validators.required],
        description: [''],
    });

    save() {
        if(this.form.invalid) return;
        this.loading = true;
        this.api.create(this.form.getRawValue() as CreateCategory).subscribe({
            next: () => { this.msg = 'Categoria creada'; this.loading = false; this.form.reset(); },
            error: (e) => { this.msg = 'Error al crear la cateogria'; this.loading = false; console.error(e);}
        })
    }
}