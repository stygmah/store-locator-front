import { Component, OnInit, Input } from '@angular/core';
import { Establishment } from 'src/app/models/Establishment.model';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

    @Input() establishment: Establishment;

    constructor(private uploadService: UploadService) { }

    ngOnInit() {

    }


    getImgUrl(img: string) {
        return this.uploadService.getImgUrl(img);
    }
}
