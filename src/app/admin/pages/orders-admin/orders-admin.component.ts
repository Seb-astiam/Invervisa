import { Component, inject } from "@angular/core";
import { Order, OrdersService } from "../../../orders/services/orders.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const STATUSES: Order['status'][] = ['pending', 'paid', "shipped", "delivered", 'cancelled'];

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './orders-admin.component.html',
    styleUrl: 'orders-admin.component.css'
})
export class OrderAdminComponent {
    private api = inject(OrdersService);
    loading= true;
    orders: Order[] = [];
    statusses = STATUSES; 

    ngOnInit() {
        this.load()
    }

    load() {
        this.loading = true;
        this.api.getAll().subscribe({
            next: (res: Order[] ) => { this.orders = res },
            error: (e: any) => alert('Error al cambiar estado: ' + (e.error.message || '')) 
        })
    }

    update(o: Order) {
        this.api.updateStatus(o.id, o.status).subscribe({
            next: () => {},
            error: (e: any) => { alert('Error al cambiar el estado: ' +  (e.error.message || '')) } 
        })
    }
}