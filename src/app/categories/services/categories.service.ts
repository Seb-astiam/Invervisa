import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/enviroment";
import { HttpClient } from "@angular/common/http";

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface CreateCategory {
    name: string;
    description?: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private API = environment.apiUrl + '/categories';
    private http = inject(HttpClient);

    getAll() {
        return this.http.get<Category[]>(this.API) ;
    }

    create(dto: CreateCategory) {
        return this.http.post<CreateCategory>(this.API, dto);
    }
}
