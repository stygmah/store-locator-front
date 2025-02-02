import { MapProperty } from '../map-utilities/map-property.class';

export class MapTheme {
    id: string;
    name: string;
    description?: string;
    imgURL: string;
    properties: MapProperty[];
}