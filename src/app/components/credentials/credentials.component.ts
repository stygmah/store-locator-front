import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-credentials',
    templateUrl: './credentials.component.html',
    styleUrls: ['./credentials.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CredentialsComponent implements OnInit {

    constructor(@Inject(DOCUMENT) private _document ) { }

    ngOnInit() {
        this._document.body.classList.add('base-color-body');
    }
    ngOnDestroy() {
        // remove the class form body tag
        this._document.body.classList.remove('base-color-body');
    }

}
