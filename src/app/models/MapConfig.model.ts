import { MapProperty } from '../map-utilities/map-property.class';
import { MapTheme } from './MapTheme.model';

export class MapConfig {
    // tslint:disable-next-line: variable-name
    selectedSlidersValues: {
        label: number,
        landmark: number,
        road: number
    };
    theme?: MapTheme;
    marker?: string;
    zoom: number;
    location: string;
    coord: {lat: number, lon: number};
    propertiesArray?: MapProperty[];
}
