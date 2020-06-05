import { Component, OnInit } from '@angular/core';
import { MAP_INITIAL_VALUES } from 'src/app/enums/map-initial-values.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MapEditorService } from 'src/app/services/map-editor.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

    private values: any;
    private initialValues: FormGroup;

    constructor(
        private mapEditorService: MapEditorService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.values = MAP_INITIAL_VALUES;
        this.initialValues = this.formBuilder.group({
            location: [MAP_INITIAL_VALUES.Closest],
            zoom: [12],
            lat: [null],
            lon: [null]
        });
        this.initialValues.valueChanges.subscribe(formValues => this.pushToMap(formValues))
    }

    private pushToMap(formValues){
        this.mapEditorService.pushInitialValues({
            zoom: formValues.zoom,
            location: formValues.location,
            coord: {
                lat: formValues.lat,
                lon: formValues.lon
            }
        });
    }

}
