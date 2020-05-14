import { Component, OnInit } from '@angular/core';
import { MapEditorService } from 'src/app/services/map-editor.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.scss']
})
export class PinsListComponent implements OnInit {

    constructor(
        private mapEditorService: MapEditorService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        //get user pins
    }

    close() {
        this.modalService.destroy();
    }
}
