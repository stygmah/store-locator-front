import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaveService } from 'src/app/services/save.service';
import { SAVE_STATE } from 'src/app/enums/save-state.enum';
import { Establishment } from 'src/app/models/Establishment.model';
import { EstablishmentService } from 'src/app/services/establishment.service';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.scss']
})
export class CreateOrEditComponent implements OnInit {

    private storeForm: FormGroup;


    constructor(
        private formBuilder: FormBuilder,
        private saveService: SaveService,
        private establishmentService: EstablishmentService
    ) { }

    ngOnInit() {
        this.initForm();
        this.formSubscriptions();
        this.listenToSaveEvents();
    }

    private initForm(values?: any) {
        this.storeForm = this.formBuilder.group({
            name: [values ? values.name : '', [Validators.required, Validators.email]],
            address: [values ? values.address : '', Validators.required],
            country: [values ? values.country : '', Validators.required],
            city: [values ? values.city : '', Validators.required],
            phone: values ? values.phone : '',
            email: [values ? values.email : '', Validators.email],
            website: values ? values.website : '',
            description: values ? values.description : '',
            geolocationActive: values ? values.geolocationActive : false,
            lat: values ? values.lat : null,
            lon: values ? values.lon : null,
            categories: [],
        });
    }

    private formSubscriptions() {
        this.storeForm.valueChanges.subscribe((val) => this.saveService.changed());
    }

    get form(): any {
        return this.storeForm.controls;
    }

    private listenToSaveEvents() {
        this.saveService.state.subscribe((state) => {
            switch(state){
                case SAVE_STATE.SAVE:
                    this.saveStore();
                    break;
                case SAVE_STATE.RESET:
                    this.undo();
                    break;
                default:
                    break;
            }
        });
    }

    private saveStore() {
        //validate form
        this.saveService.loading();
        this.establishmentService.addOrEditNewEstablishment(this.formToEstablishment()).subscribe((result)=>{

            this.saveService.idle();
        });
    }

    private undo() {
        this.saveService.idle();
    }

    private formToEstablishment(): Establishment {
        const establishmentData: Establishment = this.extractFormValues(this.form);
        return establishmentData;

    }

    private extractFormValues(obj: any): any {
        let result = {}

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                result[property] = obj[property].value;
            }
        }
        return result;
    } //TODO Pull out and make reusable

}
