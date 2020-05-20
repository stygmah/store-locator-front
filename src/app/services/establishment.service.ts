import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Establishment } from '../models/Establishment.model';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

    constructor(private http: HttpClient) { }



    addOrEditNewEstablishment(establishment: any) {
        // tslint:disable-next-line: max-line-length
        const url = establishment._id ? `${environment.baseUrl}/establishments/${establishment._id}` : `${environment.baseUrl}/establishments`;
        console.log(url);
        return this.http.post(url, establishment);
    }
    getEstablishmentsList(fieldToOrderBy: string, orderDirection: string, page: number, pageSize: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<any>(`${environment.baseUrl}/establishments/list/${fieldToOrderBy}&${orderDirection}&${page}&${pageSize}`);
    }
}