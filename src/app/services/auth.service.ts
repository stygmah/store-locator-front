import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }


    public login(email: string, password: string, keepOpen: boolean) {
        return this.http.post(this.baseUrl + '/users/login', {email, password})
        .pipe(map((resp: any) => {
            this.setToken(resp.token, keepOpen);
            //Add user to user service
        }));
    }

    public getToken() {
        return localStorage.auth_token ? localStorage.auth_token : sessionStorage.auth_token;
    }

    setToken(token: string, keepOpen: boolean): void {
        if (keepOpen) {
            localStorage.setItem('auth_token', token);
        } else {
            sessionStorage.setItem('auth_token', token);
        }
    }

    public logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    public isRouteAuthenticated(): boolean {
        return true;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) { token = this.getToken(); }
        if (!token) { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }
}
