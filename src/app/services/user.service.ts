import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.baseUrl}/users`);
    }

    getById(email: string) {
        return this.http.get(`${environment.baseUrl}/users/${email}`);
    }

    register(user: User) {
        return this.http.post(`${environment.baseUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.baseUrl}/users/${user.email}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/users/${id}`);
    }

    resetPassword(email: any) {
        return this.http.post(`${environment.baseUrl}/users/reset-password`, email);
    }
}
