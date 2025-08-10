import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/enviroment";
import { HttpClient } from "@angular/common/http";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
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
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private API = environment.apiUrl + '/productos';
    private http = inject(HttpClient)

    getAll () { 
        return this.http.get<Product[]>(this.API);
    }

    getOne (id: string) {
        return this.http.get<Product>(`${this.API}/${id}`)
    }

    create (dto: CreateProduct) {
        return this.http.post<Product>(this.API, dto)
    }
}