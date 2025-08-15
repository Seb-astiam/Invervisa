import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/enviroment";
import { HttpClient } from "@angular/common/http";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    brand: string;
    imageUrl?: string;
    categoryId: string;
}

export interface CreateProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    categoryId: string;
    brand: string;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    discount?: number;
    brand?: string;
    imageUrl?: string;
    categoryId?: string;
  }

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private API = environment.apiUrl + '/products';
    private http = inject(HttpClient)

    getAll () { 
        return this.http.get<Product[]>(this.API);
    }

    getOne (id: string) {
        return this.http.get<Product>(`${this.API}/${id}`)
    }

    create (dto: CreateProduct) {
        return this.http.post<CreateProduct>(this.API, dto)
    }

    update(id: string, dto: UpdateProductDto) {
        return this.http.patch<Product>(`${this.API}/${id}`, dto);
    }

    remove(id: string) {
        return this.http.delete(`${this.API}/${id}`);
    }

    priceWithDiscount(price: number, discount: number) {
        const divide = discount / 100;
        const subtracted = price * divide;
        return price - subtracted
    }
    
}