import { Component, inject } from "@angular/core";
import { Order, OrdersService } from "../../services/orders.service";

@Component({
    selector: 'app-orders',
    imports: [],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent {
    private api = inject(OrdersService);
    orders: Order[] = [];
    loading = true;

    ngOnInit() {
        this.api.getMyOrders().subscribe({
            next: (res: Order[]) => { this.orders = res; this.loading = false; },
            error: () => { this.loading = false } 
        });
    }
}