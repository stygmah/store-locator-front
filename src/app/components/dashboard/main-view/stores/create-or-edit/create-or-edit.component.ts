import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaveService } from 'src/app/services/save.service';
import { SAVE_STATE } from 'src/app/enums/save-state.enum';
import { Establishment } from 'src/app/models/Establishment.model';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { FileDropComponent } from 'src/app/components/common/file-drop/file-drop.component';
import { Subscription, forkJoin, of } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { switchMap, tap , filter } from 'rxjs/operators';


@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.scss']
})
export class CreateOrEditComponent implements OnInit {

    private storeForm: FormGroup;
    private saveSubscription: Subscription;
    private uploadSubscription: Subscription;

    private storeId;
    private currentImg: string;
    private initialObject: any;

    private categories: string[];

    private geolocation: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private saveService: SaveService,
        private establishmentService: EstablishmentService,
        private router: Router,
        private modalService: ModalService,
        private uploadService: UploadService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.initInitialObject();
        this.initForm();
        this.formSubscriptions();
        this.listenToSaveEvents();
        this.imgUploadSubscription();
        this.categories = ['Category1', 'Category2', 'category3'];


        this.activatedRoute.params.pipe(
            tap(params => this.storeId = params.id), // saving id
            filter(params => !!params.id), // ignoring service until we have an id
            switchMap(params => this.establishmentService.getEstablishment(params.id)),
        ).subscribe((data: any) => {
            this.initialObject = data;
            this.changeFormValues(data);
            this.saveService.idle();
        });

    }

    private initForm(values?: any) {
        this.storeForm = this.formBuilder.group({
            name: [values ? values.name : '', [Validators.required, Validators.email]],
            address: [values ? values.address : '', Validators.required],
            country: [values ? values.country : null, Validators.required],
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

    private initInitialObject () {
        this.initialObject = {
            imageUrl: null
        }
    }


    changeFormValues(values: any) {
        for (const property in this.form) {
            if (this.form.hasOwnProperty(property)) {
                this.form[property].setValue(values[property]);
            }
        }
        this.currentImg = values.imageUrl;
    }

    private formSubscriptions() {
        this.storeForm.valueChanges.subscribe((val) => this.saveService.changed());
    }

    private imgUploadSubscription() {

        this.uploadSubscription = this.uploadService.fileJustUploaded.subscribe(img => {
            const oldImg = this.currentImg;
            this.currentImg = img;
            this.deleteImg(oldImg);
        });
    }

    get form(): any {
        return this.storeForm.controls;
    }

    private listenToSaveEvents() {
        this.saveSubscription = this.saveService.state.subscribe((state) => {
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
        forkJoin(
            [
                this.establishmentService.addOrEditNewEstablishment(this.formToEstablishment(), this.storeId),
                // tslint:disable-next-line: max-line-length
                (this.storeId && (this.currentImg !== this.initialObject.imageUrl) ) && !!this.initialObject.imageUrl ? this.uploadService.deleteFile(this.initialObject.imageUrl) : of(0)
            ]
        )
        .subscribe((result) => {
            this.saveService.idle();
            this.router.navigate(['/stores']);
        });
    }


    private undo() {
        this.deleteImg(this.currentImg);
        this.changeFormValues(this.initialObject);
        this.saveService.idle();
    }



    private formToEstablishment(): Establishment {
        let establishmentData: Establishment = this.extractFormValues(this.form);
        establishmentData.imageUrl = this.currentImg;
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


    openUploadImg() {
        this.modalService.init(FileDropComponent, null, null);
    }

    getImgUrl(img: string) {
        return this.uploadService.getImgUrl(img);
    }

    deleteImg(img: string) {
        if(!this.initialObject || img === this.initialObject.imageUrl || !img) { return; }
        console.log(img)
        this.uploadService.deleteFile(img).subscribe((res) =>{/**TODO: Handle errors */})
    }

    setCountry(country) {
        this.form.country.setValue(country);
    }


    //End
    ngOnDestroy() {
        this.saveSubscription.unsubscribe();
        this.uploadSubscription.unsubscribe();
    }

    private parseCoord(coord){
        return parseFloat(coord);
    }

}
