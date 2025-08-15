import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category, CategoryService } from '../../../categories/services/categories.service';
import { Product, ProductsService } from '../../services/products.service';
import { AuthService } from '../../../auth/services/auth.services';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-browse',
  imports: [CommonModule, RouterLink],
  templateUrl: './browse-by-category.component.html',
  styleUrl: './browse-by-category.component.css'
})
export class BrowseByCategoryComponent {
  private api = inject(CategoryService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private cart = inject(CartService);
  productsApi = inject(ProductsService);
  categories = signal<(Category & { products?: Product[] })[]>([]);
  loading = signal(true);

  // 

  ngOnInit() {
    this.api.getAll().subscribe({
      next: (res: Category[]) => { 
        this.categories.set(res); 
        console.log(this.categories, 'para saber')
        this.loading.set(false)
      },
      error: () => this.loading.set(false)
    })
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' , block: 'start' });
  }

  trackId = (_: number, c: Category) => c.id;
  trackPid = (_: number, p: any) => p.id;

  addToCart(p: Product) {
    if(!this.auth.isAuthenticated()) { this.router.navigate(['/auth/login']); return}
    this.cart.add({ productId: p.id, quantity: 1}).subscribe({
      next: _ => alert('Agregado'),
      error: e => alert('Error al agregar: ' + (e?.error?.message || ''))
    });
  }
  
}
