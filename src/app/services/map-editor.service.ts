import { Injectable } from '@angular/core';
import { MapProperty } from '../map-utilities/map-property.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapEditorService {

    public allMapOptionsArray: BehaviorSubject<MapProperty[]>;
    public mapOptions: BehaviorSubject<any> ;
    public mapCustomFeatures: BehaviorSubject<any> ;

    constructor() {
        this.allMapOptionsArray = new BehaviorSubject([]);
        this.mapCustomFeatures = new BehaviorSubject([]);
        this.mapOptions = new BehaviorSubject([]);
    }

    public emitNewCustomizationMapValues(values: any) {
        this.mapCustomFeatures.next(values);
        // this.updateOptionsArray(this.convertAllToPropertiesArray());
    }

    public emitNewOptionsMapValues(values: any) {
        this.mapOptions.next(values);
        this.updateOptionsArray(this.convertAllToPropertiesArray());
    }

    private updateOptionsArray(arr: MapProperty[]) {
        this.allMapOptionsArray.next(arr);
    }

    private convertAllToPropertiesArray() {
        return [
        //  ...Object.values(this.mapCustomFeatures),
            ...this.mapOptions.getValue()
        ];
    }

}
