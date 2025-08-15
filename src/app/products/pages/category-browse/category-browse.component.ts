import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductsService } from '../../services/products.service';
import { Category, CategoryService } from '../../../categories/services/categories.service';

@Component({
  selector: 'app-category-browse',
  imports: [CommonModule, RouterLink],
  templateUrl: './category-browse.component.html',
  styleUrl: './category-browse.component.css'
})
export class CategoryBrowseComponent {
  readonly productsApi = inject(ProductsService);
  private categoryApi = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  loadingCats = signal(true);
  loadingProds = signal(true);
  selectedId = signal<string | null>(null);

  ngOnInit() {
    this.categoryApi.getAll().subscribe({
      next: (cats) => {
        this.categories.set(cats);
        this.loadingCats.set(false);
        const q = this.route.snapshot.queryParamMap.get('category');
        const initial = q || cats[0]?.id || null;
        this.setCategory(initial);
      },
      error: () => this.loadingCats.set(false)
    })

    this.route.queryParamMap.subscribe(params => {
      const cat  = params.get('category');
      if(cat && cat !== this.selectedId()) {
          this.setCategory(cat, false);
      }
    })
  }

  setCategory(categoryId: string | null, updateUrl = true ) {
    this.selectedId.set(categoryId);

    if (updateUrl && categoryId) {
      this.router.navigate([], { relativeTo: this.route, queryParams: { category: categoryId}, queryParamsHandling: 'merge' });
    }

    if (!categoryId) { this.products.set([]); this.loadingProds.set(false); return; }

    this.loadingProds.set(true);


    // this.productsApi.getByCategory(categoryId).subscribe({
    //   next: (prods) => { this.products.set(prods); this.loadingProds.set(false); },
    //   error: _ => this.loadingProds.set(false),
    // });

    this.productsApi.getAll().subscribe({
      next: (all) => {
        const filtered = (all as any[]).filter(p => p.categoryId === categoryId || p.category?.id === categoryId);
        this.products.set(filtered);
        this.loadingProds.set(false);
      },
      error: () => { this.loadingProds.set(false) }
    })
  }

  selectCategory(id: string) {
    this.setCategory(id); 
  }

  currentCategoryName() {
    const id = this.selectedId();
    const c = this.categories().find(x => x.id === id);
    return c?.name ?? 'Productos';
  }
}
