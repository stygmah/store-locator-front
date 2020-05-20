import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Establishment.model';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

    private establishments: any;
    private totalCount: number;

    constructor(
        private establishmentService: EstablishmentService
    ) { }

    ngOnInit() {
        this.getEstablishmentsList('name', 'asc', 1, 5);
    }

    getEstablishmentsList(field: string, direction: string, page: number, pageSize: number) {
        this.establishmentService.getEstablishmentsList(field, direction, page, pageSize).subscribe((list) => {
            this.establishments = list.data;
            this.totalCount = list.count;
        });
    }

    refreshTable(infoFromTable: any) {
        this.getEstablishmentsList(infoFromTable.field, infoFromTable.direction, infoFromTable.page, infoFromTable.pageSize);
    }

}
