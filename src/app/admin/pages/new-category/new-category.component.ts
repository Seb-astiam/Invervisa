import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CategoryService, CreateCategory } from "../../../categories/services/categories.service";

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './new-category.component.html',
    styleUrl: './new-category.component.css'
    
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