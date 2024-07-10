export interface TableProps<T> {
    columns: IColumn[];
    data?: T[];
    loading?: boolean;
    handleSort?: (column: string, asc: boolean) => void;
    sortOrder?: boolean;
    handleClickRow?: (row: T) => void;
}

export type IColumn = {
    label: string;
    sortable?: boolean;
    name: string;
}