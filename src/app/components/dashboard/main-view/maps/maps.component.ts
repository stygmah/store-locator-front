import { Component, OnInit } from '@angular/core';
import { MapAtributes } from 'src/app/map-utilities/atributes.maps';
import { MapEditorService } from 'src/app/services/map-editor.service';
import { MapConfig } from 'src/app/models/MapConfig.model';
import { SaveService } from 'src/app/services/save.service';
import { SAVE_STATE } from 'src/app/enums/save-state.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    private initialObject: any;
    private saveSubscription: Subscription;

    private lat: number;
    private lon: number;
    private zoom: number;
    private styles: any[];

    private loading: boolean;

    constructor(
        private mapEditorService: MapEditorService,
        private saveService: SaveService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.mapEditorService.getFullCustomConfig().subscribe((mapObject) => {

            this.initialObject = mapObject;

            this.setCoords(mapObject.coord);
            this.subscriptions();
            this.initiateObject();
            this.processSliderValues();
            this.listenToSaveEvents();

            this.loading = false;
        });
    }

    private subscriptions() {
        this.mapEditorService.mapCustomizationArray.subscribe((e) => {
            this.styles = e;
        });
        this.mapEditorService.initialValues.subscribe((e) => {
            this.zoom = e.zoom;
            if (e.coord) { this.setCoords(e.coord); }
        });
    }


    //sends recieved object to service
    private initiateObject() {
        //initial values
        this.mapEditorService.pushInitialValues(
            {location: this.initialObject.location,
                zoom: this.initialObject.zoom,
                coord: this.initialObject.coord
            });
        //customization
        ///styles
        this.mapEditorService.updateOptionsArray(this.initialObject.propertiesArray);
        ///slider positions
        this.mapEditorService.setSliderValues(
            this.initialObject.selectedSlidersValues.label,
            this.initialObject.selectedSlidersValues.landmark,
            this.initialObject.selectedSlidersValues.road);
        //marker

        //theme
    }




    private processSliderValues() {
        this.mapEditorService.processLabelValue(this.initialObject.selectedSlidersValues.label);
        this.mapEditorService.processLandmarkValue(this.initialObject.selectedSlidersValues.landmark);
        this.mapEditorService.processRoadValue(this.initialObject.selectedSlidersValues.road);
    }

    private listenToSaveEvents() {
        this.saveSubscription = this.saveService.state.subscribe((state) => {
            switch(state){
                case SAVE_STATE.SAVE:
                    this.save();
                    break;
                case SAVE_STATE.RESET:
                    this.reset();
                    break;
                default:
                    break;
            }
        });
    }


    private setCoords(coords: any){
        this.lat = coords.lat;
        this.lon = coords.lng;
    }

    ///
    /// Save functions
    ///
    private save(){
        this.mapEditorService.saveMapCustomization('');
    }

    private reset(){
        console.log('discard');
    }
}
