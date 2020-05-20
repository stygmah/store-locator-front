import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SAVE_STATE } from '../enums/save-state.enum';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

    public state: BehaviorSubject<SAVE_STATE>;

    constructor() {
        this.state = new BehaviorSubject(SAVE_STATE.IDLE);
    }

    public save() {
        this.state.next(SAVE_STATE.SAVE);
    }

    public reset() {
        this.state.next(SAVE_STATE.RESET);
    }

    public changed() {
        this.state.next(SAVE_STATE.CHANGED);
    }

    public idle() {
        this.state.next(SAVE_STATE.IDLE);
    }

    public loading() {
        this.state.next(SAVE_STATE.LOADING);
    }

}
