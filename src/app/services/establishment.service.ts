import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

    constructor(private http: HttpClient) { }



    addOrEditNewEstablishment(establishment: any) {
        const url = establishment._id ? `${environment.baseUrl}/establishments/${establishment._id}` : `${environment.baseUrl}/establishments`;
        console.log(url);
        return this.http.post(url, establishment);
    }

}
