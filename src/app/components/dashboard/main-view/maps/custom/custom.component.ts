import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDER_VALUES_4 } from 'src/app/enums/custom-basic-sliders.enum';
import { MapPropertyExtended, MapProperty } from 'src/app/map-utilities/map-property.class';
import { MapEditorService } from 'src/app/services/map-editor.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

    private slidersForm: FormGroup;
    private labelObject: any;
    private landmarkObject: any;
    private roadObject: any;

    constructor(
        private formBuilder: FormBuilder,
        private mapEditorService: MapEditorService
    ) { }

    ngOnInit() {
        this.initSliders();
        this.slidersForm.valueChanges.subscribe((value) => {
            this.processSlidersValues();
            this.mapEditorService.emitNewSliderValues(this.sliderValuesToArray());
        });
    }

    initSliders() {
        this.slidersForm = this.formBuilder.group({
            labels: [100, Validators.required],
            landmarks: [100, Validators.required],
            roads: [100, Validators.required]
        });
        this.initBlankSliderArrays();
    }

    initBlankSliderArrays() {
        this.roadObject = [];
        this.labelObject = [];
        this.landmarkObject = [];
    }



    ///
    /// SLIDER VALUES FUNCTIONS
    ///
    processSlidersValues() {
        this.processLandmarkValue();
        this.processLabelValue();
        this.processRoadValue();
        console.log( this.sliderValuesToArray() );
    }


    processLabelValue() {
        switch (this.slidersForm.value.labels) {
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
    }

    processLandmarkValue() {
        switch (this.slidersForm.value.landmarks) {
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
    }

    processRoadValue() {
        switch (this.slidersForm.value.roads) {
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
    }

    sliderValuesToArray() {
        return [
            ...this.landmarkObject,
            ...this.roadObject,
            ...this.labelObject
        ];
    }
    ///



}
