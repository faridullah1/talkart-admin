import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig, TableAction, TableSignal } from 'app/shared/generic-table/models';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	tableConfig: TableConfig;
	actions = new Subject<TableAction>();

	constructor(private dialog: MatDialog)
	{
		this.tableConfig = {
			title: 'Users',
			slug: 'users',

			showAdd: false,
			showSearch: true,

			searchColumn: 'name',

			rowActions: [
				{name: 'edit', title: 'Edit', action: 'OnEdit' },
				{name: 'delete', title: 'Delete', action: 'OnDelete' }
			],

			columns: [
				{ name: 'name', title: 'Name' },
				{ name: 'email', title: 'Email' },
				{ name: 'createdAt', title: 'Date Created', format: 'date' },
			]
		};
	}

	ngOnInit(): void {
	}

	onTableSignal(ev: TableSignal): void {
		console.log('Table signal =', ev);
	}
}
