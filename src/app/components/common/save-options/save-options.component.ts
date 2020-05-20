import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SaveService } from 'src/app/services/save.service';
import { SAVE_STATE } from 'src/app/enums/save-state.enum';

@Component({
  selector: 'app-save-options',
  templateUrl: './save-options.component.html',
  styleUrls: ['./save-options.component.scss']
})
export class SaveOptionsComponent implements OnInit {

    private show: boolean;
    private loading: boolean;

    constructor(private saveService: SaveService) { }

    ngOnInit() {
        this.show = false;
        this.saveService.state.subscribe((state) => {
            this.show = state === SAVE_STATE.IDLE ? false : true;
            this.loading = state === SAVE_STATE.LOADING ? true : false;
        });
    }

    saveAction() {
        this.saveService.save();
    }
    discardAction() {
        this.saveService.reset();
    }

}
