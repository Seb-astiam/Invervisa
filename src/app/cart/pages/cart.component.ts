import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CartItem, CartService } from "../services/cart.service";
import { ProductsService } from "../../products/services/products.service";
// import { CheckoutComponent } from "../../orders/pages/checkout/checkout.component";

@Component({
    selector: 'app-cart',
    imports: [CommonModule, FormsModule, RouterLink, ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent {
    private cart = inject(CartService);
    product = inject(ProductsService)
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
        return Math.round(
          this.items.reduce((acc, it) => {
            const unit = this.product.priceWithDiscount(Number(it.product.price), Number(it.product.discount ?? 0));
            return acc + unit * it.quantity;
          }, 0) * 100
        ) / 100;
      }

    savingsOnProducts() {
        return Math.round(
            this.items.reduce((acc, it) => acc + this.lineSaving(it), 0) * 100
        ) / 100;
    }

    private lineSaving(i: { product: { price: number; discount?: number }; quantity: number }) {
        const price = Number(i.product.price ?? 0);
        const discount = Number(i.product.discount ?? 0);
        if (discount <= 0) return 0;
        const perUnitSaving = price - this.product.priceWithDiscount(price, discount);
        return Math.round(perUnitSaving * i.quantity * 100) / 100;
    }

    updateQty(i: CartItem) {
        this.cart.update(i.id, { quantity: Math.max(1, i.quantity) }).subscribe({
            next: _ => { },
            error: e => alert('Error al actualizar: ' + (e?.error?.message || ''))
        });
    }

    increase(i: CartItem) {
        i.quantity = i.quantity + 1;
        this.updateQty(i);
    }

    decrease(i: CartItem) {
        if (i.quantity === 1) return;
        i.quantity = Math.max(1, i.quantity - 1);
        this.updateQty(i);
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

    cleanCart() {
        this.cart.clear().subscribe({
            next: () => { alert("Carrito vaciado"); this.loading = false; this.items = [] },
            error: () => { this.loading = true }
        })
    }

    priceXItems(price: number, quantity: number ) {
       return price * quantity
    }

   
}