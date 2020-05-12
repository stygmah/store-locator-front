import { Component, OnInit } from '@angular/core';
import { MapEditorService } from 'src/app/services/map-editor.service';
import { MapTheme } from 'src/app/models/MapTheme.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss']
})
export class ThemesListComponent implements OnInit {

    private themes: MapTheme[];
    private selectedTheme: MapTheme;

    constructor(
        private mapEditorService: MapEditorService,
        private modalService: ModalService
        ) { }



    ngOnInit() {
        this.mapEditorService.getThemePage().subscribe(themes => this.themes = themes);
    }

    close() {
        this.modalService.destroy();
    }

    selectTheme(){
        
    }

}
