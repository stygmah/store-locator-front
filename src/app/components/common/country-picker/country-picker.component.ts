import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import countryList from '../../../../assets/countries/countries_ENG.json';


@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryPickerComponent implements OnInit {



    private selectCtrl: FormControl;
    private searchCtrl: FormControl;

    private country: Country;
    private countries: Country[];


    @Input() initialValue: any;
    @Input() requiredMsg: boolean;
    @Input() errorMsg: boolean;
    @Output() recieveValue = new EventEmitter<Country>();


    constructor() { }

    ngOnInit() {
        this.selectCtrl = new FormControl(this.setInitialValue(this.initialValue));
        this.searchCtrl = new FormControl('');

        this.countries = countryList;

        this.searchCtrl.valueChanges.subscribe(search => this.countries = this.filterCountries(search));
        this.selectCtrl.valueChanges.subscribe(value => this.recieveValue.emit(value));


    }

    private filterCountries(value) {
        const filtered = countryList.filter((country) => {
            return country.name.toLowerCase().includes(value.toLowerCase()) || country.code.toLowerCase().includes(value.toLowerCase())
        });
        return filtered;
    }

    private setInitialValue(code: string): Country {
        let index:number = 0;
        let found = false;
        while( index < countryList.length && !found) {
            if(countryList[index].code === code) {
                found = true;
            }
            index++;
        }
        return found ? countryList[index-1] : null;
    }

}
export class Country {
    name: string;
    code: string;
}
