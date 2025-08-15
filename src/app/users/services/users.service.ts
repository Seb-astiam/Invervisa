import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/enviroment';
import { HttpClient } from '@angular/common/http';

export interface Me {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface UpdateMeDto {
  name?: string;
  email?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API = environment.apiUrl + '/users';
  private http = inject(HttpClient);

  getMe() {
    return this.http.get<Me>(`${this.API}/me`)
  }

  updateMe(dto: UpdateMeDto) {
    return this.http.patch<Me>(`${this.API}/me`, dto); 
  }

  changePassword(dto: ChangePasswordDto) {
    return this.http.patch(`${this.API}/me/password`, dto)
  }
  
}
