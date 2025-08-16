import { Component, inject } from "@angular/core";
import { Order, OrdersService } from "../../services/orders.service";
import { DatePipe, NgClass } from "@angular/common";

@Component({
    selector: 'app-orders',
    imports: [DatePipe, NgClass],
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