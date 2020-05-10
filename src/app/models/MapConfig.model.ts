import { MapProperty } from '../map-utilities/map-property.class';
import { MapTheme } from './MapTheme.model';

export class MapConfig {
    parentMapId: string;
    mainOptions: any;
    customizationOptions: {
        selectedSlidersValues: {
            label: number,
            landmark: number,
            road: number
        },
        sliderTotalValue: MapProperty[]
    };
    theme: MapTheme;
}
