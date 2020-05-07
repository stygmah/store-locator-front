import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private baseUrl = environment.baseUrl;
    private token;

    constructor(private http: HttpClient) { }


    public login(email: string, password: string, keepOpen: boolean) {
        return this.http.post(this.baseUrl + '/users/login', {email, password})
        .pipe(map((resp: any) => {
            if (keepOpen) {
                localStorage.setItem('auth_token', resp.token);
            } else {
                sessionStorage.setItem('auth_token', resp.token);
            }
            //Add user to user service
        }));
    }

    public getToken() {
        return this.token;
    }

}
