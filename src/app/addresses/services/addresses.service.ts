import { Inject, Injectable } from "@angular/core";
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

@Injectable({ providedIn: 'root' })
export class AddressService {
    private API = environment.apiUrl + '/addresses';
    private http = Inject(HttpClient);

    getMine() {
        return this.http.get(this.API);
    }
}