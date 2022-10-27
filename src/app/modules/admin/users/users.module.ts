import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DialogHeaderModule } from 'app/shared/dialog-header/module';
import { MaterialModule } from 'app/modules/material/material.module';
import { GenericTableModule } from 'app/shared/generic-table/module';
import { UsersComponent } from './users.component';

const routes: Route[] = [
    {
        path     : '',
        component: UsersComponent
    }
];

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
	ReactiveFormsModule,
	RouterModule.forChild(routes),

	GenericTableModule,
	DialogHeaderModule,
	MaterialModule
  ]
})
export class UsersModule { }
