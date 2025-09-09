import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Product, ProductsService } from "../../services/products.service";
import { CartService } from "../../../cart/services/cart.service";
import { AuthService } from "../../../auth/services/auth.services";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
    private route = inject(ActivatedRoute);
    api = inject(ProductsService);
    private cart = inject(CartService);
    private auth = inject(AuthService);
    private router = inject(Router);

    product?: Product;
    loading = true;
    qty = 1;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.api.getOne(id).subscribe({
            next: p => { this.product = p; this.loading = false; },
            error: _ => this.loading = false
        });
    }

    addToCart() {
        if (!this.product) return;
        if (!this.auth.isAuthenticated()) { this.router.navigate(['/auth/login']); return; }
        this.cart.add({ productId: this.product.id, quantity: Math.max(1, this.qty) }).subscribe({
            next: _ => alert('Agregado'),
            error: e => alert('Error al agregar: ' + (e?.error?.message || ''))
        });
    }

    decreaseQuantity() {
        if (this.qty > 1) {
            this.qty--;
        }
    }

    increaseQuantity() {
        if (this.qty < 99) {
            this.qty++;
        }
    }
}