import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
	MatDialogModule,
	MatCardModule,
	MatStepperModule,
	MatCheckboxModule,
	MatTableModule,
	MatPaginatorModule,
	MatFormFieldModule,
	MatCardModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSelectModule,
	MatButtonModule,
	MatProgressBarModule,
	MatSlideToggleModule,
	MatProgressSpinnerModule
  ],
  exports: [
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
	MatDialogModule,
	MatCardModule,
	MatStepperModule,
	MatCheckboxModule,
	MatTableModule,
	MatPaginatorModule,
	MatFormFieldModule,
	MatCardModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSelectModule,
	MatButtonModule,
	MatProgressBarModule,
	MatSlideToggleModule,
	MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
