import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Establishment } from '../models/Establishment.model';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

    constructor(private http: HttpClient) { }



    addOrEditNewEstablishment(establishment: any, id: string) {
        // tslint:disable-next-line: max-line-length
        const url = id ? `${environment.baseUrl}/establishments/get/${id}` : `${environment.baseUrl}/establishments`;
        return this.http.post(url, {establishment});
    }
    getEstablishmentsList(fieldToOrderBy: string, orderDirection: string, page: number, pageSize: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<any>(`${environment.baseUrl}/establishments/list/${fieldToOrderBy}&${orderDirection}&${page}&${pageSize}`);
    }

    getEstablishment(id: string) {
        return this.http.get<any>(`${environment.baseUrl}/establishments/${id}`);
    }

    deleteEstablishments(ids: string[]) {
        return this.http.post<any>(`${environment.baseUrl}/establishments/delete`, {ids});
    }
}
