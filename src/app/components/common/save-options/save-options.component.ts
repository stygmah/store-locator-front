import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-save-options',
  templateUrl: './save-options.component.html',
  styleUrls: ['./save-options.component.scss']
})
export class SaveOptionsComponent implements OnInit {

    @Output() save = new EventEmitter();
    @Output() discard = new EventEmitter();;

    constructor() { }

    ngOnInit() {
    }

    saveAction() {
        this.save.emit('save');
    }
    discardAction() {
        this.discard.emit('discard');
    }

}
