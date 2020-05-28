import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {

    fileToUpload: File = null;

    constructor(
        private uploadService: UploadService,
        private saveService: SaveService
        ) { }

    ngOnInit() {

    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFile() {
        this.uploadService.uploadFile(this.fileToUpload).subscribe((data: any) => {
            // do something, if upload success
            this.uploadService.addFileJustUploaded(data.name);
            this.saveService.changed();
        }, error => {
            console.log(error);
        });
    }
}
