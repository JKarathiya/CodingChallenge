import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { CountryBase } from 'src/app/models/countrybase.model';
import { Country } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
    selector: 'app-country-detail',
    templateUrl: './country-detail.component.html',
    styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
    public country: Country;

    constructor(
        private countryService: CountriesService,
        public dialogRef: MatDialogRef<CountryDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CountryBase) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.countryService.getCountryDetail(this.data.name).pipe(first()).subscribe(
            (val: Country) => {
                this.country = val;
            });
    }

    getUrl() {
        return "url(" + this.data.flag + ")";
    }
}