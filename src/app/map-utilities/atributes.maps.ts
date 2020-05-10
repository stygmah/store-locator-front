import { MapPropertyExtended, MapProperty } from './map-property.class';


export class MapAtributes {
    static setBaseMap(): any {
        return  {
            // All
            all: new MapPropertyExtended('all', 'all'),
            allLabels: new MapPropertyExtended('labels'),
            allGeometry: new MapProperty('geometry'),
            allTextFill: new MapProperty('labels.text.fill'),
            allTextStroke: new MapProperty('labels.text.stroke'),

            // Administrative
            administrativeBase: new MapPropertyExtended('administrative', 'geometry'),
            administrativeTextFill: new MapPropertyExtended('administrative', 'labels.text.fill'),
            administrativeTextStroke: new MapPropertyExtended('administrative', 'labels.text.stroke'),

            localityBase: new MapPropertyExtended('administrative.locality', 'geometry'),
            localityTextFill: new MapPropertyExtended('administrative.locality', 'labels.text.fill'),
            localityTextStroke: new MapPropertyExtended('administrative.locality', 'labels.text.stroke'),

            countryBase: new MapPropertyExtended('administrative.country', 'geometry'),
            countryTextFill: new MapPropertyExtended('administrative.country', 'labels.text.fill'),
            countryTextStroke: new MapPropertyExtended('administrative.country', 'labels.text.stroke'),

            provinceBase: new MapPropertyExtended('administrative.land_parcel', 'labels.text.stroke'),
            provinceTextFill: new MapPropertyExtended('administrative.land_parcel', 'labels.text.stroke'),
            provinceTextStroke: new MapPropertyExtended('administrative.land_parcel', 'labels.text.stroke'),

            landscapeBase: new MapPropertyExtended('landscape', 'geometry'),
            landscapeTextFill: new MapPropertyExtended('landscape', 'labels.text.fill'),
            landscapeTextStroke: new MapPropertyExtended('landscape', 'labels.text.stroke'),

            poiBase: new MapPropertyExtended('poi', 'geometry'),
            poiTextFill: new MapPropertyExtended('poi', 'labels.text.fill'),
            poiTextStroke: new MapPropertyExtended('poi', 'labels.text.stroke'),

            waterBase: new MapPropertyExtended('water', 'geometry'),
            waterTextFill: new MapPropertyExtended('water', 'geometry'),
            waterTextStroke: new MapPropertyExtended('water', 'geometry'),
        };
    }


}

