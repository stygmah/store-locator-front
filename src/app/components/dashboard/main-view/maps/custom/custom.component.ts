import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDER_VALUES_4 } from 'src/app/enums/custom-basic-sliders.enum';
import { MapPropertyExtended, MapProperty } from 'src/app/map-utilities/map-property.class';
import { MapEditorService } from 'src/app/services/map-editor.service';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { ModalService } from 'src/app/services/modal.service';
import { PinsListComponent } from './pins-list/pins-list.component';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

    private slidersForm: FormGroup;
    private selectedTheme: any;
    private selectedPointer: any;

    constructor(
        private formBuilder: FormBuilder,
        private mapEditorService: MapEditorService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.initSliders();
        console.log(this.mapEditorService.areSlidersSet())
        this.setInitValue ();
    }

    initSliders() {
        this.slidersForm = this.formBuilder.group({
            labels: [100, Validators.required],
            landmarks: [100, Validators.required],
            roads: [100, Validators.required]
        });
        this.sliderListeners();
    }

    setInitValue() {
        if (!this.mapEditorService.areSlidersSet()) {//TODO: change checker as thme and pointer are not checked but asumed
            this.mapEditorService.getFullCustomConfig().subscribe((e: any) => {
                this.slidersForm.controls.labels.setValue(e.config.selectedSlidersValues.label);
                this.slidersForm.controls.landmarks.setValue(e.config.selectedSlidersValues.landmark);
                this.slidersForm.controls.roads.setValue(e.config.selectedSlidersValues.road);

                this.mapEditorService.setSliderValues(
                    e.config.selectedSlidersValues.label,
                    e.config.selectedSlidersValues.landmark,
                    e.config.selectedSlidersValues.road
                );

                this.selectedTheme = e.config.theme;
                this.selectedPointer = e.config.marker;//move out to own func

            });
        } else {
            this.slidersForm.controls.labels.setValue(this.mapEditorService.getSlidersRefValue().labels);
            this.slidersForm.controls.landmarks.setValue(this.mapEditorService.getSlidersRefValue().landmarks);
            this.slidersForm.controls.roads.setValue(this.mapEditorService.getSlidersRefValue().roads);
        }
    }


    sliderListeners() {
        this.slidersForm.controls.labels.valueChanges.subscribe((value) => {
            this.mapEditorService.processLabelValue(value);
        });
        this.slidersForm.controls.landmarks.valueChanges.subscribe((value) => {
            this.mapEditorService.processLandmarkValue(value);
        });
        this.slidersForm.controls.roads.valueChanges.subscribe((value) => {
            this.mapEditorService.processRoadValue(value);
        });
    }

    showModalThemes() {
        this.modalService.init(ThemesListComponent, null, null);
    }
    showModalMarkers() {
        this.modalService.init(PinsListComponent, null, null);
    }


}
