import { Component, OnInit, ViewChild } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Establishment.model';
import { StoreTableComponent } from './store-table/store-table.component';
import { forkJoin, of } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { StoreDisplayComponent } from './store-display/store-display.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

    @ViewChild(StoreTableComponent) child: StoreTableComponent;
    private establishments: any;
    private totalCount: number;


    constructor(
        private establishmentService: EstablishmentService,
        private uploadService: UploadService,
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

    delete(event) {
        forkJoin([
            this.establishmentService.deleteEstablishments(event.ids),
            event.imgs.length > 0 ? this.uploadService.deleteFiles(event.imgs) : of(0)
        ])
        .subscribe(() => {
            this.child.refresh();
        });
    }

    // openEstablishmentModal(establishment) {
    //     this.modalService.init(StoreDisplayComponent, {establishment}, null);
    // } TODO!!!

}
