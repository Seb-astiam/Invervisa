import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environment/enviroment";
import { HttpClient } from "@angular/common/http";

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

export interface CreateAddressDto extends Omit<Address, 'id'> {}
export interface UpdateAddressDto extends Partial<CreateAddressDto> {}

@Injectable({ providedIn: 'root' })
export class AddressService {
    private API = environment.apiUrl + '/addresses';
    private readonly http = inject(HttpClient);

    getMine() {
        return this.http.get(this.API) as any;
    }

    create(dto: CreateAddressDto) {
        return this.http.post<Address>(this.API, dto)
    }

    update(id: string, dto: UpdateAddressDto) {
        return this.http.patch<Address>(`${this.API}/${id}`, dto);
    }

    remove(id: string) {
        return this.http.delete(`${this.API}/${id}`);
    }
}