import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environment/enviroment";
import { HttpClient } from "@angular/common/http";

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    priceAtPurchase: number;
    product?: { id: string; name: string; imageUrl?: string;  };
}

export interface Order {
    id: string;
    userId: string;
    user: { 
        createdAt: string;
        email: string;
        name: string;
    }
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    totalPrice: number;
    createdAt: string;
    items: OrderItem[];
    address?: { id: string; street: string; city: string; state: string; zipCode: string; };
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
    private API = environment.apiUrl + '/orders';
    private http = inject(HttpClient);

    createFromCart(addressId: string) {
        return this.http.post<Order>(`${this.API}/from-cart`, { addressId });
    }

    getMyOrders() {
        return this.http.get<Order[]>(this.API + '/my');
    }

    getAll() {
        return this.http.get<Order[]>(this.API);
    }

    updateStatus(id: string, status: Order['status']) {
        return this.http.patch(`${this.API}/${id}/status`, { status });
    }
}