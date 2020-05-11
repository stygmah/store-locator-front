import { MapProperty } from '../map-utilities/map-property.class';
import { MapTheme } from './MapTheme.model';

export class MapConfig {
    parentMapId: string;
    mainOptions: any;
    selectedSlidersValues: {
        label: number,
        landmark: number,
        road: number
    };
    theme: MapTheme;
    marker: string;
}
