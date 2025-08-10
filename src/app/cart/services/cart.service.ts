import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/enviroment";
import { HttpClient } from "@angular/common/http";

export interface CartItem {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    product: {
        id: string; 
        name: string;
        price: number;
        imageUrl?: string;
    }
}

export interface AddToCartDto {
    productId: string;
    quantity: number;
}

export interface UpdateCartDto {
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private API = environment.apiUrl + '/cart';
    private htpp = inject(HttpClient);

    getMyCart() {
        return this.htpp.get<CartItem[]>(this.API);
    }

    add(dto: AddToCartDto) {
        return this.htpp.post<CartItem>(this.API, dto);
    }

    update(id: string, dto: UpdateCartDto) {
        return this.htpp.patch<CartItem>(`${this.API}/${id}`, dto); 
    }

    remove(id: string) {
        return this.htpp.delete(`${this.API}/${id}`);
    }

    clear() {
        return this.htpp.delete(this.API);
    }

}