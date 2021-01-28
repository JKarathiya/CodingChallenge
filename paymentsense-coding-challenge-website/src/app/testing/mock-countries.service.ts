import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { CountryBase } from '../models/countrybase.model';

@Injectable({
    providedIn: 'root'
})
export class MockCountriesService {
    public getCountries(): Observable<CountryBase[]> {
        const countryList: CountryBase[] = [
            {
                name: "abc",
                flag: "https://flag"
            },
            {
                name: "abc1",
                flag: "https://flag1"
            }
        ];
        return of(countryList);
    }

    public getCountryDetail(countryName: string): Observable<Country> {
        const country: Country = {
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
            translations: {
                "de": "Afghanistan",
                "es": "Afganistán",
                "fr": "Afghanistan",
                "ja": "アフガニスタン",
                "it": "Afghanistan",
                "br": "Afeganistão",
                "pt": "Afeganistão"
            },
            regionalBlocs: [
                {
                    "acronym": "SAARC",
                    "name": "South Asian Association for Regional Cooperation",
                    "otherAcronyms": [],
                    "otherNames": []
                }
            ],
            cioc: "AFG",
            name: countryName,
            flag: "https://restcountries.eu/data/afg.svg"
        }
        return of(country);
    }
}
