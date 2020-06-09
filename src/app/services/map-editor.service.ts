import { Injectable } from '@angular/core';
import { MapProperty, MapPropertyExtended } from '../map-utilities/map-property.class';
import { BehaviorSubject } from 'rxjs';
import { MapTheme } from '../models/MapTheme.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SLIDER_VALUES_4 } from '../enums/custom-basic-sliders.enum';
import { MapConfig } from '../models/MapConfig.model';
import { MapAtributes } from '../map-utilities/atributes.maps';

@Injectable({
  providedIn: 'root'
})
export class MapEditorService {

    readonly mapCustomizationArray: BehaviorSubject<MapProperty[]>;
    public initialValues: BehaviorSubject<any>;
    public theme: BehaviorSubject<any>;

    private optionsRefValue: any;
    private slidersRefValue: any;

    labelObject: MapPropertyExtended[];
    landmarkObject: MapPropertyExtended[];
    roadObject: MapPropertyExtended[];//TODO convert all three to own object

    constructor(
        private http: HttpClient
    ) {
        this.mapCustomizationArray = new BehaviorSubject([]);
        this.initialValues = new BehaviorSubject({});
        this.theme = new BehaviorSubject({});

        this.initValues();
        this.initBlankSliderArrays();
    }


    ///
    /// Init functions
    ///
    private initValues() {
        this.slidersRefValue = {};
        this.optionsRefValue = {};
    }

    areSlidersSet() {
        return Object.keys(this.slidersRefValue).length > 0;
    }
    areOptionsSet() {
        return Object.keys(this.optionsRefValue).length > 0;
    }

    getSlidersRefValue(): any {
        return this.slidersRefValue;
    }
    getOptionsRefValue(): any {
        return this.optionsRefValue;
    }

    setSliderValues(labels, landmarks, roads) {
        this.slidersRefValue = {
            labels,
            landmarks,
            roads
        };
    }

    ///
    /// Pushers
    ///
    public updateOptionsArray(arr: MapProperty[]) {
        this.mapCustomizationArray.next(arr);
    }

    public pushInitialValues(value: {location: string, zoom: number, coord?: any}) {
        this.initialValues.next(value);
    }

    public fullThemePush(theme) {
        this.theme.next(theme);
    }

    ///
    /// HTTP REQUESTS
    ///
    getThemePage(page?: number) {
        page = page ? page : 0;
        return this.http.get<MapTheme[]>(`${environment.baseUrl}/themes/page/${page}`);
    }

    getThemeById(id: string) {
        return this.http.get(`${environment.baseUrl}/themes/${id}`);
    }

    saveMapCustomization() {
        return this.http.post(`${environment.baseUrl}/map`, {config: this.createMapToSave()});
    }

    getFullCustomConfig() {
        return this.http.get<MapConfig>(`${environment.baseUrl}/map`);
    }

    private createMapToSave(): MapConfig {
        console.log(this.theme.value._id)
        return {
            selectedSlidersValues: {
                label: this.slidersRefValue.labels,
                landmark: this.slidersRefValue.landmarks,
                road: this.slidersRefValue.roads
            },
            zoom: this.initialValues.value.zoom,
            location: this.initialValues.value.location,
            coord: this.initialValues.value.coord,
            propertiesArray: this.mapCustomizationArray.value,
            theme: this.theme.value._id
        };
    }

    ///
    /// Slider values
    ///

    processLabelValue(value) {
        switch (value) {
            case SLIDER_VALUES_4.POSITION1:
                this.labelObject = [new MapPropertyExtended('all', 'labels', [{visibility: 'off'}])];
                break;
            case SLIDER_VALUES_4.POSITION2:
                this.labelObject = [
                    new MapPropertyExtended('administrative.land_parcel', 'labels.text', [{visibility: 'off'}]),
                    new MapPropertyExtended('administrative.neighborhood', 'labels.text', [{visibility: 'off'}]),
                    new MapPropertyExtended('poi', 'labels.text', [{visibility: 'off'}]),
                    new MapPropertyExtended('road', 'labels.text', [{visibility: 'off'}]),
                    new MapPropertyExtended('water', 'labels.text', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION3:
                this.labelObject = [
                    new MapPropertyExtended('road', 'labels.text', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION4:
                this.labelObject = [];
                break;
        }
        this.slidersRefValue.labels = value;
        this.updateOptionsArray(this.sliderValuesToArray());
    }

    processLandmarkValue(value) {
        switch (value) {
            case SLIDER_VALUES_4.POSITION1:
                this.landmarkObject = [new MapPropertyExtended('poi', 'all', [{visibility: 'off'}])];
                break;
            case SLIDER_VALUES_4.POSITION2:
                this.landmarkObject = [
                    new MapPropertyExtended('poi', 'labels', [{visibility: 'off'}])
                ];
                break;
            case SLIDER_VALUES_4.POSITION3:
                this.landmarkObject = [
                    new MapPropertyExtended('poi.business', 'all', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION4:
                this.landmarkObject = [];
                break;
        }
        this.slidersRefValue.landmarks = value;
        this.updateOptionsArray(this.sliderValuesToArray());
    }

    processRoadValue(value) {
        switch (value) {
            case SLIDER_VALUES_4.POSITION1:
                this.roadObject = [new MapPropertyExtended('road', 'all', [{visibility: 'off'}])];
                break;
            case SLIDER_VALUES_4.POSITION2:
                this.roadObject = [
                    new MapPropertyExtended('road.arterial', 'all', [{visibility: 'off'}]),
                    new MapPropertyExtended('road.local', 'all', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION3:
                this.roadObject = [
                    new MapPropertyExtended('road.local', 'all', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION4:
                this.roadObject = [];
                break;
        }
        this.slidersRefValue.roads = value;
        this.updateOptionsArray(this.sliderValuesToArray());
    }

    sliderValuesToArray() {
        return [
            ...this.landmarkObject,
            ...this.roadObject,
            ...this.labelObject
        ];
    }
    initBlankSliderArrays() {
        this.roadObject = [];
        this.labelObject = [];
        this.landmarkObject = [];
    }
    


}
