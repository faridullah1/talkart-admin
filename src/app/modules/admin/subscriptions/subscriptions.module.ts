import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DialogHeaderModule } from 'app/shared/dialog-header/module';
import { MaterialModule } from 'app/modules/material/material.module';
import { SubscriptionsComponent } from './subscriptions.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';

const routes: Route[] = [
    {
        path     : '',
        component: SubscriptionsComponent
    }
];

@NgModule({
  declarations: [
    SubscriptionsComponent,
    AddSubscriptionComponent,
  ],
  imports: [
    CommonModule,
	ReactiveFormsModule,
	RouterModule.forChild(routes),

	DialogHeaderModule,
	MaterialModule
  ]
})
export class SubscriptionsModule { }
