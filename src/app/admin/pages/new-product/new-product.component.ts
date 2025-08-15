import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CreateProduct, ProductsService } from "../../../products/services/products.service";
import { Category, CategoryService } from "../../../categories/services/categories.service";

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './new-product.component.html',
    styleUrl: './new-product.component.css' 
})
export class NewProductComponent {
    private fb = inject(FormBuilder);
    private productsApi = inject(ProductsService);
    private categoriesApi = inject(CategoryService);

    categories: Category[] = [];
    loading = false;
    msg = '';

    form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        stock: [0, [Validators.required, Validators.min(0)]],
        categoryId: ['', Validators.required],
        imageUrl: ['']
    })

    ngOnInit() {
        this.categoriesApi.getAll().subscribe({
            next: (res: any) => {
                this.categories = res
            },
            error: (e) => console.error("Error cargando categorias", e),
        });
    }

    save() {
        if (this.form.invalid) return;
        this.loading = true;
        this.productsApi.create(this.form.getRawValue() as CreateProduct).subscribe({
            next: () => { this.msg = "Producto Creado"; this.loading = false; this.form.reset(); },
            error: (e) => { this.msg = "Error al crear producto"; this.loading = false; console.error(e); }
        });
    }
}