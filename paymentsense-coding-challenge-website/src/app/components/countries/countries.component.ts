import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import { first } from 'rxjs/operators';
import { Country } from 'src/app/models/country.model';
import { CountryBase } from 'src/app/models/countrybase.model';
import { CountryDetailComponent } from '../country-detail/country-detail.component';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
    displayedColumns: string[] = ['name', 'flag'];
    dataSource: MatTableDataSource<CountryBase>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private countryService: CountriesService,
        public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource<CountryBase>([]);
    }

    ngOnInit(): void {
        this.countryService.getCountries().pipe(first()).subscribe(
            (data: Country[]) => {
                this.dataSource = new MatTableDataSource<CountryBase>(data);
                this.dataSource.paginator = this.paginator;
            });
    }

    dialogRef: MatDialogRef<CountryDetailComponent, any>;
    getRecord(row): void {
        if (this.dialogRef) {
            return;
        }

        this.dialogRef = this.dialog.open(CountryDetailComponent, {
            width: '500px',
            maxHeight: '700px',
            data: { name: row.name, flag: row.flag }
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }
}