import { Injectable } from '@angular/core';
import { MapProperty, MapPropertyExtended } from '../map-utilities/map-property.class';
import { BehaviorSubject } from 'rxjs';
import { MapTheme } from '../models/MapTheme.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SLIDER_VALUES_4 } from '../enums/custom-basic-sliders.enum';

@Injectable({
  providedIn: 'root'
})
export class MapEditorService {

    public allMapOptionsArray: BehaviorSubject<MapProperty[]>;

    private optionsRefValue: any;
    private slidersRefValue: any;
    private markerRefValue: any;
    private themeRefValue: any;

    labelObject: MapPropertyExtended[];
    landmarkObject: MapPropertyExtended[];
    roadObject: MapPropertyExtended[];//TODO convert all three to own object

    constructor(
        private http: HttpClient
    ) {
        this.allMapOptionsArray = new BehaviorSubject([]);

        this.initBlankSliderArrays();
        this.initRefObjects();
    }

    private initRefObjects() {
        this.slidersRefValue = {};
        this.optionsRefValue = {};
        this.markerRefValue = '';
        this.themeRefValue = {};
    }


    private updateOptionsArray(arr: MapProperty[]) {
        this.allMapOptionsArray.next(arr);
    }

    ///
    /// HTTP REQUESTS
    ///
    getThemePage(page?: number) {
        page = page ? page : 0;
        return this.http.get<MapTheme[]>(`${environment.baseUrl}/themes/page/${page}`);
    }

    getById(id: string) {
        return this.http.get(`${environment.baseUrl}/themes/${id}`);
    }

    saveMapCustomization(payload: any) {
        return this.http.post(`${environment.baseUrl}/themes`, payload);
    }

    getFullCustomConfig() {
        return this.http.get(`${environment.baseUrl}/maps/by_user/true`);
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
                    new MapPropertyExtended('road.highway', 'labels', [{visibility: 'off'}]),
                    new MapPropertyExtended('road.local', 'all', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION3:
                this.roadObject = [
                    new MapPropertyExtended('road.arterial', 'labels', [{visibility: 'off'}]),
                    new MapPropertyExtended('road.highway', 'labels', [{visibility: 'off'}]),
                    new MapPropertyExtended('road.local', 'all', [{visibility: 'off'}]),
                ];
                break;
            case SLIDER_VALUES_4.POSITION4:
                this.roadObject = [];
                break;
        }
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
