import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CartItem, CartService } from "../services/cart.service";

@Component({
    selector: 'app-cart',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent {
    private cart = inject(CartService);
    private router = inject(Router);

    items: CartItem[] = [];
    loading = true;

    ngOnInit() {
        this.load();
    }

    load() {
        this.loading = true;
        this.cart.getMyCart().subscribe({
            next: r => { this.items = r; this.loading = false; },
            error: _ => this.loading = false
        });
    }

    subtotal() {
        return this.items.reduce((acc, it) => acc + Number(it.product.price) * it.quantity, 0)
    }

    updateQty(i: CartItem) {
        this.cart.update(i.id, { quantity: Math.max(1, i.quantity) }).subscribe({
            next: _ => {},
            error: e => alert('Error al actualizar: ' + (e?.error?.message || ''))
        });
    }

    remove(i: CartItem) {
        this.cart.remove(i.id).subscribe({
            next: _ => this.load(),
            error: e => alert('Error al quitar: ' + (e?.error?.message || ''))
        });
    }

    goCheckout() {
        this.router.navigate(['/orders/checkout']);
    }
}