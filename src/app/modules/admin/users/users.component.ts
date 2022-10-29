import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig, TableAction } from 'app/shared/generic-table/models';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
	tableConfig: TableConfig;
	actions = new Subject<TableAction>();

	constructor(private dialog: MatDialog)
	{
		this.tableConfig = {
			title: 'Users',
			slug: 'users',
			primaryKey: 'userId',

			showAdd: false,
			showSearch: true,

			searchColumn: 'name',

			rowActions: [
				{name: 'delete', title: 'Delete', action: 'OnDelete' }
			],

			columns: [
				{ name: 'name', title: 'Name' },
				{ name: 'email', title: 'Email' },
				{ name: 'createdAt', title: 'Date Created', format: 'date' },
			]
		};
	}
}
