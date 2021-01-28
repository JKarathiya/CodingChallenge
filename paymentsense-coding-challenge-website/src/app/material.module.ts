import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatListModule,
        MatDialogModule,
        MatCardModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatListModule,
        MatDialogModule,
        MatCardModule

    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
    ]
})

export class MaterialModule { }