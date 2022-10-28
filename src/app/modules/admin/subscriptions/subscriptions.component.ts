import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/api.service';
import { SubscriptionPlan, GenericApiResponse } from 'app/models';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
	subscriptions: SubscriptionPlan[] = [];
	loading = false;
	disableBtn = false;

	constructor(private apiService: ApiService,
				private confirmationService: FuseConfirmationService,
				private dialog: MatDialog)
	{ }

	ngOnInit(): void {
		this.getAllPlans();
	}

	getAllPlans(): void {
		this.loading = true;

		this.apiService.get('/plans').subscribe({
			next: (resp: GenericApiResponse) =>
			{
				this.loading = false;
				this.subscriptions = resp.data.plans.map((plan: any) => {
					plan.benefits = plan.benefits.split(',');
					return plan;
				});
			},
			error: () => this.loading = false
		});
	}

	openPlanDialog(plan: SubscriptionPlan = null): void {
		const dialog = this.dialog.open(AddSubscriptionComponent, {
			width: '40%',
			panelClass: 'dlg-add-plan'
		});

		if (plan) {
			dialog.componentInstance.plan = plan;
		}

		dialog.afterClosed().subscribe((resp: boolean) => {
			if (resp) {
				this.getAllPlans();
			}
		});
	}

	onDeletePlan(plan: SubscriptionPlan): void {
		const dialog = this.confirmationService.open({
			title: 'Delete Subscription Plan?'
		});

		dialog.afterClosed().subscribe((action: 'confirmed' | 'cancelled') => {
			if (action === 'confirmed') {
				this.disableBtn = true;

				this.apiService.delete(`/plans/${plan.planId}`).subscribe({
					next: () =>
					{
						this.disableBtn = false;
						this.getAllPlans();
					},
					error: () => this.disableBtn = false
				});
			}
		});
	}
}
