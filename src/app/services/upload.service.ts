import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    readonly fileJustUploaded: Subject<any>;

    constructor(private http: HttpClient) {
        this.fileJustUploaded = new Subject<any>();
     }

    uploadFile(fileToUpload){
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);

        return this.http.post(`${environment.baseUrl}/upload`, formData);
    }

    deleteFile(fileKey: string) {
        return this.http.delete(`${environment.baseUrl}/img/${fileKey}`);
    }

    deleteFiles(fileKeys: string[]) {
        return this.http.post(`${environment.baseUrl}/img/delete-multiple`, {keys: fileKeys});
    }

    addFileJustUploaded(file: any) {
        this.fileJustUploaded.next(file);
    }

    getImgUrl(img: string) {
        return `${environment.baseUrl}/img/${img}`;
    }
}
