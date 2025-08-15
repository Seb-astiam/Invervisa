import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductsService } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../auth/services/auth.services';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html', 
  styleUrl: './productos.component.css'
})
export class ProductsComponent {
  api = inject(ProductsService);
  private cart = inject(CartService);
  private auth = inject(AuthService);
  private router = inject(Router);

  products: Product[] = [];
  loading = true;

  ngOnInit() {
    this.api.getAll().subscribe({
      next: (res) => { this.products = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

 
  addToCart(p: Product) {
    if(!this.auth.isAuthenticated()) { this.router.navigate(['/auth/login']); return}
    this.cart.add({ productId: p.id, quantity: 1}).subscribe({
      next: _ => alert('Agregado'),
      error: e => alert('Error al agregar: ' + (e?.error?.message || ''))
    });
  }
}
