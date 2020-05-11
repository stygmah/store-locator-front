import { Injectable } from '@angular/core';
import { MapProperty } from '../map-utilities/map-property.class';
import { BehaviorSubject } from 'rxjs';
import { MapTheme } from '../models/MapTheme.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapEditorService {

    public allMapOptionsArray: BehaviorSubject<MapProperty[]>;
    public mapCustomSliderValues: BehaviorSubject<any> ;
    public mapOptions: BehaviorSubject<any> ;

    private optionsRefValue: any;
    private slidersRefValue: any;
    private markerRefValue: any;
    private themeRefValue: any;

    constructor(
        private http: HttpClient
    ) {
        this.allMapOptionsArray = new BehaviorSubject([]);
        this.mapOptions = new BehaviorSubject([]);
        this.mapCustomSliderValues = new BehaviorSubject([]);
    }

    public initiateValues(config: any)
    {

    }


    public emitNewOptionsMapValues(values: any) {
        this.mapOptions.next(values);
        this.updateOptionsArray(this.convertAllToPropertiesArray());
    }

    public emitNewSliderValues(values: any) {
        this.mapCustomSliderValues.next(values);
        this.updateOptionsArray(this.convertAllToPropertiesArray());
    }

    private updateOptionsArray(arr: MapProperty[]) {
        this.allMapOptionsArray.next(arr);
    }

    private convertAllToPropertiesArray() {
        return [
        //  ...Object.values(this.mapOptions),
            ...this.mapCustomSliderValues.getValue()
        ];
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
    /// Reference object setters
    ///

    setSlidersReference(value: any) {
        this.slidersRefValue = value;
    }
    setThemeReference(value: any) {
        this.themeRefValue = value;
    }
    setMarkerReference(value: any) {
        this.markerRefValue = value;
    }
    setOptionsReference(value: any) {
        this.optionsRefValue = value;
    }
}
