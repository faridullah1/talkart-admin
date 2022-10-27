export type TableFormat = 'number' | 'image' | 'boolean' | 'date' | 'datetime';

export interface TableConfig {
    title: string;
    slug: string;

	addBtnText?: string;
	showAdd: boolean;
	showSearch: boolean;

	searchColumn?: string;
	where?: WhereData;

    rowActions: TableRowAction[];
    columns: TableColumn[];
}

export interface TableColumn {
    name: string;
    title: string;
    sortable?: boolean;
    visible?: boolean;
    format?: TableFormat;
}

export interface WhereData {
	column: string;
	search: any;

	op: 'eq' | 'lt' | 'lte' | 'gt' | 'gte' | 'ne';
}

export interface TableRowAction {
    name: string;
    title: string;
	action: string;
}

export interface TableSignal {
	type: string;
	row: any;
}

export interface TableAction {
	type: 'reload';
}
