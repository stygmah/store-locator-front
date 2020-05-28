import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Establishment } from 'src/app/models/Establishment.model';

@Component({
  selector: 'app-store-table',
  templateUrl: './store-table.component.html',
  styleUrls: ['./store-table.component.scss']
})
export class StoreTableComponent implements OnInit, OnChanges {

    @Input() list: Establishment[];
    @Input() count: number;
    @Output() getNewList =  new EventEmitter<any>();
    @Output() delete =  new EventEmitter<any>();
    @Output() viewEstablishment =  new EventEmitter<any>();

    private sortDirection: string;
    private sortField: string;
    private page: number;
    private pageSize: number;
    private pages: number;

    private toDelete: boolean[];
    private deleteGeneral: boolean;


    constructor() { }

    ngOnInit() {
        this.sortDirection = 'asc';
        this.page = 1;
        this.pageSize = 5;
        this.pages = Math.ceil(this.count / this.pageSize);
        this.deleteGeneral = false;
        this.resetDeleteArray();
    }

    ngOnChanges() {
        this.pages = Math.ceil(this.count / this.pageSize);
        this.deleteGeneral = false;
    }

    changeSort(field: string) {
        this.changeSortField(field);
        this.changeSortDirection();
        this.refresh();
    }

    private resetDeleteArray() {
        this.toDelete = [];
        for (let i = 0; i < this.list.length; i++) { this.toDelete[i] = false; }
    }

    private setAllDeletesTrue() {
        for (let i = 0; i < this.list.length; i++) { this.toDelete[i] = true; }
    }

    private changeSortDirection() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    private changeSortField(field: string) {
        this.sortField = field;
    }

    private goToPage(page: number) {
        this.page = page;
        this.refresh();
    }

    public refresh() {
        this.getNewList.emit({
            field: this.sortField,
            direction: this.sortDirection,
            page: this.page,
            pageSize: this.pageSize
        });
        this.resetValues();
    }

    private deleteEstablishments() {
        this.delete.emit(this.getDeleteIdArray());
    }

    private getDeleteIdArray() {
        let toDelete = {
            ids: [],
            imgs: []
        }
        this.toDelete.forEach((element, index) => {
            if (element) { 
                toDelete.ids.push(this.list[index]._id);
                if (this.list[index].imageUrl) { toDelete.imgs.push(this.list[index].imageUrl); }
            }
        });
        return toDelete;
    }

    public resetValues() {
        this.page = 1;
        this.pageSize = 5;
        this.pages = Math.ceil(this.count / this.pageSize);
        this.deleteGeneral = false;
        this.resetDeleteArray();
    }

    private sendEstablishmentToModal(establishment) {
        this.viewEstablishment.emit(establishment);
    }


}
