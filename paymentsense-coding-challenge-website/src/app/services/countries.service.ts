import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';
import { CountryBase } from '../models/countrybase.model';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    constructor(private httpClient: HttpClient) { }

    public getCountries(): Observable<CountryBase[]> {
        return this.httpClient.get<CountryBase[]>(`${environment.apiUrl}/countries`);
    }

    public getCountryDetail(countryName: string): Observable<Country> {
        return this.httpClient.get<Country>(`${environment.apiUrl}/countries/${countryName}`);
    }
}
