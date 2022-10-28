import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { SubscriptionPlan } from './../../../../models';


@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
	theForm: FormGroup;
	plan: SubscriptionPlan;
	title = 'Add Plan';
	disableBtn = false;

	constructor(private dialogRef: MatDialogRef<AddSubscriptionComponent>,
				private fb: FormBuilder,
				private apiService: ApiService)
	{
		this.theForm = fb.group({
			title: ['', Validators.required],
			price: ['', Validators.required],
			coins: ['', Validators.required],
			benefits: [''],
			isRecommended: [false]
		});
	}

	ngOnInit(): void {
		if (this.plan) {
			this.title = 'Update Plan';
			this.theForm.patchValue(this.plan);
			this.theForm.get('benefits').setValue(this.plan.benefits.join(','));
		}
	}

	onSubmit(): void {
		this.disableBtn = true;
		console.log(this.theForm.value);

		if (this.plan) {
			this.apiService.patch(`/plans/${this.plan.planId}`, this.theForm.value).subscribe({
				next: () => this.dialogRef.close(true),
				error: () => this.disableBtn = false
			});
		}
		else {
			this.apiService.post('/plans', this.theForm.value).subscribe({
				next: () => this.dialogRef.close(true),
				error: () => this.disableBtn = false
			});
		}
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
