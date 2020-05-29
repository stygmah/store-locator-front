import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import countryList from '../../../../assets/countries/countries_ENG.json';


@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent implements OnInit {



    private selectCtrl: FormControl;
    private searchCtrl: FormControl;

    private country: Country;
    private countries: Country[];


    @Input() initialValue:Country;
    @Output() recieveValue = new EventEmitter<Country>();


    constructor() { }

    ngOnInit() {

        this.selectCtrl = new FormControl(this.initialValue ? this.initialValue : '');
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

}
export class Country {
    name: string;
    code: string;
}
