import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { MaterialModule } from 'src/app/material.module';
import { Country } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/services/countries.service';

import { CountryDetailComponent } from './country-detail.component';

describe('CountryDetailComponent', () => {
    let component: CountryDetailComponent;
    let fixture: ComponentFixture<CountryDetailComponent>;
    let mockCountriesService;

    beforeEach(async(() => {
        mockCountriesService = jasmine.createSpyObj(['getCountryDetail']);
        mockCountriesService.getCountryDetail.and.returnValue(of({}));

        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, HttpClientModule, MaterialModule],
            declarations: [CountryDetailComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: CountriesService, useValue: mockCountriesService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryDetailComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should retrieve country detail from the API`, () => {
        fixture.detectChanges();

        // Assert:
        expect(mockCountriesService.getCountryDetail).toHaveBeenCalled();
    });

    it(`should load retrieved questions into the page variable`, () => {
        // Arrange:
        const country = getCountry();
        mockCountriesService.getCountryDetail.and.returnValue(of(country));

        // Act:
        fixture.detectChanges();

        // Assert:
        expect(component.country).toBe(country);
    });
});

function getCountry(): Country {
    return {
        topLevelDomain: [
            ".af"
        ],
        alpha2Code: "AF",
        alpha3Code: "AFG",
        callingCodes: [
            "93"
        ],
        capital: "Kabul",
        altSpellings: [
            "AF",
            "Afġānistān"
        ],
        region: "Asia",
        subregion: "Southern Asia",
        population: 27657145,
        latlng: [
            33,
            65
        ],
        demonym: "Afghan",
        area: 652230,
        gini: 27.8,
        timezones: [
            "UTC+04:30"
        ],
        borders: [
            "IRN",
            "PAK",
            "TKM",
            "UZB",
            "TJK",
            "CHN"
        ],
        nativeName: "افغانستان",
        numericCode: "004",
        currencies: [
            {
                "code": "AFN",
                "name": "Afghan afghani",
                "symbol": "؋"
            }
        ],
        languages: [
            {
                "iso6391": "ps",
                "iso6392": "pus",
                "name": "Pashto",
                "nativeName": "پښتو"
            },
            {
                "iso6391": "uz",
                "iso6392": "uzb",
                "name": "Uzbek",
                "nativeName": "Oʻzbek"
            },
            {
                "iso6391": "tk",
                "iso6392": "tuk",
                "name": "Turkmen",
                "nativeName": "Türkmen"
            }
        ],
        regionalBlocs: [
            {
                "acronym": "SAARC",
                "name": "South Asian Association for Regional Cooperation",
                "otherAcronyms": [],
                "otherNames": []
            }
        ],
        translations: {
            de: "Afghanistan",
            es: "Afganistán",
            fr: "Afghanistan",
            ja: "アフガニスタン",
            it: "Afghanistan",
            br: "Afeganistão",
            pt: "Afeganistão"
        },
        cioc: "AFG",
        name: "Afghanistan",
        flag: "https://restcountries.eu/data/afg.svg"
    };
}