import { Component, inject, signal } from "@angular/core";
import { Order, OrdersService } from "../../../orders/services/orders.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UsersService, User } from "../../../users/services/users.service";
import { RouterLink } from "@angular/router";

const STATUSES: Order['status'][] = ['pending', 'paid', "shipped", "delivered", 'cancelled'];



@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './orders-admin.component.html',
    styleUrl: 'orders-admin.component.css'
})
export class OrderAdminComponent {
    private ordersApi = inject(OrdersService);
    private userApi = inject(UsersService);
    loading = true;
    orders: Order[] = [];
    statusses = STATUSES;
    filtered = this.orders;
    query = '';
    statusFilter = '';

    



    ngOnInit() {
        this.load()
    }

    load() { 
        this.loading = true;
        this.ordersApi.getAll().subscribe({
            next: (res) => {
                this.orders = res;
                this.filtered = this.orders
                this.loading = false
            },
            error: (e: any) => alert('Error al cambiar estado: ' + (e.error.message || ''))
        })
    }

    getUser(userId: string) {
        this.userApi.getUserById(userId).subscribe({
            next: (res) => { },
            error: () => { }
        })
    }

    update(o: Order) {
        this.ordersApi.updateStatus(o.id, o.status).subscribe({
            next: () => { },
            error: (e: any) => { alert('Error al cambiar el estado: ' + (e.error.message || '')) }
        })
    }

    applyFilters() {
        const q = (this.query || '').toLowerCase().trim();
        const sf = (this.statusFilter || '').toLowerCase().trim();

        this.filtered = (this.orders || []).filter((o: any) => {
            const matchesQuery =
                !q ||
                (o.user?.name || '').toLowerCase().includes(q) ||
                (o.address?.city || '').toLowerCase().includes(q) ||
                String(o.id).includes(q);

            const matchesStatus = !sf || (o.status || '').toLowerCase() === sf;
            return matchesQuery && matchesStatus;
        });
    }

    trackByOrderId = (_: number, o: any) => o.id;
}