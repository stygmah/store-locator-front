import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Establishment } from 'src/app/models/Establishment.model';

@Component({
  selector: 'app-store-table',
  templateUrl: './store-table.component.html',
  styleUrls: ['./store-table.component.scss']
})
export class StoreTableComponent implements OnInit {

    @Input() list: Establishment[];
    @Input() count: number;
    @Output() getNewList =  new EventEmitter<any>();
    @Output() delete =  new EventEmitter<string[]>();

    private sortDirection: string;
    private sortField: string;
    private page: number;
    private pageSize: number;
    private pages: number;


    constructor() { }

    ngOnInit() {
        this.sortDirection = 'asc';
        this.page = 1;
        this.pageSize = 5;
        this.pages = Math.ceil(this.count / this.pageSize);
    }

    changeSort(field: string) {
        this.changeSortField(field);
        this.changeSortDirection();
        this.refresh();
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

    private refresh() {
        this.getNewList.emit({
            field: this.sortField,
            direction: this.sortDirection,
            page: this.page,
            pageSize: this.pageSize
        });
    }



}
