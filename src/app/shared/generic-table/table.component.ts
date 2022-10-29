import { GenericApiResponse } from 'app/models';
import { WhereData } from './models';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TableAction, TableConfig, TableRowAction, TableSignal } from './models';
import { ApiService } from 'app/api.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input() config: TableConfig;
	@Input() actions = new Subject<TableAction>();

	@Output() signal = new EventEmitter<TableSignal>();
	@ViewChild(MatSort) sort: MatSort;

	selectedRow: any = null;
	dataSource: any;
	loading = false;
	displayedColumns: string[] = [];
	pageSizeOptions = [10, 15, 20, 25];
	totalRecords = 0;
	limit: number = 10;
	page: number = 1;
	dataError = false;

	searchFC = new FormControl();

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	showError = () => this.dataError;

	// eslint-disable-next-line @typescript-eslint/member-ordering
	constructor(private apiService: ApiService,
				private confirmationService: FuseConfirmationService,
				private cdr: ChangeDetectorRef)
	{
		this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		this.actions.subscribe((ac: TableAction) => {
			if (ac.type === 'reload') {
				this.loadData();
			}
		});

		this.searchFC.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
			.subscribe(val => this.searchData(val));

		if (this.config) {
			for (const col of this.config.columns) {
				if (col.visible === false) {
					continue;
				};

				this.displayedColumns.push(col.name);
			}

			this.loadData();
		}
	}

	loadData(query: string | null = null): void {
		this.apiService.get(this.config.slug).subscribe({
			next: (resp: GenericApiResponse) => this.onAPIResponse(resp),
			error: (error: any) => this.handleError(error)
		});

		// this.loading = true;
		// let queryString = `?page=${this.page}&limit=${this.limit}`;

		// if (query) {
		// 	queryString = `${queryString}&${query}`;
		// }

		// if (this.config.where) {
		// 	const whereQueryStr = this.handleWhere();
		// 	queryString = `${queryString}&${whereQueryStr}`;
		// }

		// const slug = this.config.slug + queryString;

		// this.apiService.get(slug).subscribe({
		// 	next: (resp: any) => this.onAPIResponse(resp),
		// 	error: (error: any) => this.handleError(error)
		// });
	}

	onAPIResponse(resp: GenericApiResponse): void {
		this.loading = false;
		this.dataError = false;
		this.dataSource = resp.data[this.config.slug];

		this.totalRecords = resp.data[this.config.slug].length;

		if (this.totalRecords === 0)
		{
			this.dataError = true;
			const r = {
				title: 'No Record Found',
				message: ''
			};

			this.dataSource = [r];
		}

		this.cdr.detectChanges();
	}

	handleError(error: any): void {
		this.loading = false;
		this.dataError = true;
		const r = {
			title: 'Error loading data',
			message: error.message
		};

		this.dataSource = [r];
		this.cdr.detectChanges();
	}

	searchData(value: string): void {
		if (value === '' || value == null) {
			this.loadData();
			return;
		}

		const searchCol = this.config.searchColumn;

		if (searchCol) {
			const queryStr = `${searchCol}=${value}`;
			this.loadData(queryStr);
		}
	}

	handleWhere(): string {
		const { column, search, op } = this.config.where as WhereData;

		let queryString = `${column}[${op}]=${search}`;

		if (this.config?.where?.op === 'eq') {
			queryString = `${column}=${search}`;
		}

		return queryString;
	}

	onAdd(): void {
		const signal: TableSignal = {
			type: 'OpenForm',
			row: null
		};

		this.signal.emit(signal);
	}

	onRefreshData(): void {
		this.searchData(this.searchFC.value);
	}

	onRowAction(ac: TableRowAction): void {
		const signal = {
			type: ac.action,
			row: this.selectedRow
		};

		this.signal.emit(signal);

		if (ac.action === 'OnPlay') {
			const audioObj = this.selectedRow.audioWav ? this.selectedRow.audioWav : this.selectedRow.audioMp3;
			const audio = new Audio(audioObj.url);
			audio.play();
		}

		if (ac.action === 'OnDelete') {
			const dialog = this.confirmationService.open({
				title: 'Are you sure, you want to delete the record?'
			});

			dialog.afterClosed().subscribe((action: 'confirmed' | 'cancelled') => {
				if (action === 'confirmed') {
					this.apiService.delete(`${this.config.slug}/${this.selectedRow[this.config.primaryKey]}`).subscribe(() => {
						this.loadData();
					});
				}
			});
		}
	}

	onSortChange(ev: any): void {
		console.log('Table sort change =', ev);
	}

	onRowClick(row: any): void {
		if (row === this.selectedRow) {
			this.selectedRow = null;
			return;
		}

		this.selectedRow = row;
	}

	onPageChange(ev: PageEvent): void {
		this.limit = ev.pageSize;
		this.page = ev.pageIndex + 1;
		this.loadData();
	}
}
