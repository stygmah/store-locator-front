import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SaveService } from 'src/app/services/save.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

    constructor(
        @Inject(DOCUMENT) private _document,
        private saveService: SaveService
    ) { }

    ngOnInit() {
        this._document.body.classList.add('white-body');
    }

    ngOnDestroy() {
        // remove the class form body tag
        this._document.body.classList.remove('white-body');
    }


    resetSaveState(){
        this.saveService.idle();
    }

}
