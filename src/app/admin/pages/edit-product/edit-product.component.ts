import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product, ProductsService } from "../../../products/services/products.service";
import { Category, CategoryService } from "../../../categories/services/categories.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-edit-product',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
    private fb = inject(FormBuilder);
    private productsApi = inject(ProductsService);
    private categoriesApi = inject(CategoryService);

    products: Product[] = [];
    categories: Category[] = [];
    product = signal<Product | null>(null);

    loading = true;
    saving = false;
    msg = '';

    form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        stock: [0, [Validators.required, Validators.min(0)]],
        discount: [0, [Validators.min(0), Validators.max(100)]], 
        imageUrl: [''],
        brand: ['', [Validators.required]],
        categoryId: ['', Validators.required],
    });

    ngOnInit() {
        this.loadData();
    }

    private loadData() {
        this.loading = true;
        this.productsApi.getAll().subscribe({
            next: (res) => {
                this.products = res;
                this.loading = false;
            },
            error: () => (this.loading = false),
        });

        this.categoriesApi.getAll().subscribe({
            next: (res: Category[]) => (this.categories = res),
            error: () => { },
        });
    }

    selectedProduct(id: string) {
        this.loading = true;
        this.msg = '';
        this.productsApi.getOne(id).subscribe({
          next: (res) => {
            this.product.set(res);
            this.form.patchValue({
              name: res.name,
              description: res.description,
              brand: res.brand,
              price: Number(res.price),
              stock: res.stock,
              discount: (res as any)?.discount ?? 0,
              imageUrl: res.imageUrl || '',
              categoryId: (res as any)?.categoryId ?? '',
            });
            this.loading = false;
          },
          error: () => (this.loading = false),
        });
      }

      save() {
        const current = this.product();
        if (!current) return;
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
    
        this.saving = true;
        this.msg = '';
    
        this.productsApi.update(current.id, this.form.getRawValue() as Product).subscribe({
          next: (updated) => {
            this.msg = 'Producto actualizado correctamente';
            this.saving = false;
            const idx = this.products.findIndex((p) => p.id === updated.id);
            if (idx > -1) this.products[idx] = updated;
            this.product.set(updated);
          },
          error: (e) => {
            this.msg = 'Error al actualizar: ' + (e?.error?.message || '');
            this.saving = false;
          },
        });
      }

      cancel() {
        this.product.set(null);
        this.form.reset({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          discount: 0,
          imageUrl: '',
          categoryId: '',
        });
        this.msg = '';
      }

      remove() {
        const current = this.product();
        if (!current) return;
        if (!confirm('¿Eliminar este producto?')) return;
    
        this.saving = true;
        this.productsApi.remove(current.id).subscribe({
          next: () => {
            this.msg = 'Producto eliminado';
            this.saving = false;
            this.products = this.products.filter((p) => p.id !== current.id);
            this.cancel();
          },
          error: (e) => {
            this.msg = 'Error al eliminar: ' + (e?.error?.message || '');
            this.saving = false;
          },
        });
      }
}