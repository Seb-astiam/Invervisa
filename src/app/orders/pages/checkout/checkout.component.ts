import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Address, AddressService } from "../../../addresses/services/addresses.service";
import { OrdersService } from "../../services/orders.service";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './checkout.component.html',
    styleUrl: 'checkout.component.css'
})
export class CheckoutComponent {
    private addrApi = inject(AddressService);
    private ordersApi = inject(OrdersService);
    private router = inject(Router);

    addresses: Address[] = [];
    selected: string | null = null;
    loading = true;
    processing = false;
    msg = '';

    ngOnInit() {
        this.addrApi.getMine().subscribe({
            next: (list: Address[]) => {
                this.addresses = list;

                const def = list.find(a => a.isDefault);
                this.selected = def?.id || list[0]?.id || null;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    confirm() { 
        if(!this.selected) return;
        this.processing = true;
        this.ordersApi.createFromCart(this.selected).subscribe({
            next: () => {
                this.msg = 'Orden creada con exito';
                this.processing = false;
                this.router.navigate(['/orders']);
            },
            error: (e: any) => {
                this.msg = 'Error al crear la orden: ' + (e?.error?.message || '');
                this.processing = false;
            }
        });
    }
}