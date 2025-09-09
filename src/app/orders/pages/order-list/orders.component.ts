import { Component, inject } from "@angular/core";
import { Order, OrdersService } from "../../services/orders.service";
import { DatePipe, NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-orders',
    imports: [DatePipe, NgClass, RouterLink],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent {
    private api = inject(OrdersService);
    orders: Order[] = [];
    loading = true;
    selectedOrder: Order | false = false

    ngOnInit() {
        this.api.getMyOrders().subscribe({
            next: (res: Order[]) => { this.orders = res; this.loading = false; },
            error: () => { this.loading = false } 
        });
    }

    selectOrder(order: Order) {
        this.selectedOrder = order;
      }

}