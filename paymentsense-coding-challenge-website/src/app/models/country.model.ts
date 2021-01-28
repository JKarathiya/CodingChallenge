import { CountryBase } from "./countrybase.model";
import { Currencies } from "./currencies.model";
import { Languages } from "./Languages.model";
import { RegionalBlocs } from "./regionalBlocs.model";
import { Translations } from "./translations.model";

export class Country extends CountryBase {
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area?: number;
    gini?: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: Currencies[];
    languages: Languages[];
    translations: Translations;
    regionalBlocs: RegionalBlocs[]
    cioc: string;
}