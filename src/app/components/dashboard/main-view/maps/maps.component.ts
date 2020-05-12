import { Component, OnInit } from '@angular/core';
import { MapAtributes } from 'src/app/map-utilities/atributes.maps';
import { MapEditorService } from 'src/app/services/map-editor.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
    lat = 37.803180;
    lng = -122.408321;
    zoom = 15;
    private styles: any[];
    private stylesObject: any;


    constructor(
        private mapEditorService: MapEditorService
    ) { }

    ngOnInit() {
        this.initBaseStyles();
        // this.objectReferenceToMapArray();

        this.mapEditorService.allMapOptionsArray.subscribe((e) => {
            this.styles = e;
        });
    }

    private initBaseStyles() {
        this.stylesObject = MapAtributes.setBaseMap();
    }

    private addStyleToMap(element: string , property: string, value: string) {
        this.stylesObject[element].setProperty(property, value);
    }

    // private objectReferenceToMapArray() {
    //     this.styles = Object.values(this.stylesObject);
    // }

    private save(){
        console.log('save');
    }

    private reset(){
        console.log('discard');
    }
}
