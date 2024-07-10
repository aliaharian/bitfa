import { useMediaQuery } from "@uidotdev/usehooks";
import { IColumn, TableProps } from "./types";
import { ResponsiveTable } from "@/components/table/responsiveTable";
import { ArrowDown2 } from "iconsax-react";

export function Table<T>({ columns, data, loading, handleSort, sortOrder, handleClickRow }: TableProps<T>) {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

    if (loading) {
        return (
            <div>
                <p>
                    Please Wait...
                </p>
            </div>
        )
    }

    const _handleSort = (column: IColumn) => {
        if (column.sortable) {
            handleSort?.(column.name, !sortOrder)
        }
    }

    if (isSmallDevice) {
        return (
            <ResponsiveTable<T> handleClickRow={handleClickRow} columns={columns} data={data} loading={loading} _handleSort={_handleSort} sortOrder={sortOrder} />
        )
    }

    return (
        <table className="table-auto border-collapse w-full text-sm">
            <thead>
                <tr>
                    {
                        columns.map((col, index) => (
                            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-gray-800 text-left" key={index}>
                                <div role="button" onClick={() => _handleSort(col)} className={`${col.sortable ? "cursor-pointer" : ""} flex items-center`}>
                                    {col.label}
                                    {col.sortable &&
                                        <ArrowDown2 variant="Bold"
                                            className={`w-3 h-3 ${sortOrder ? "rotate-180" : ""}`} />}
                                </div>

                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="bg-white">
                {!data ?
                    <tr className="[column-span:all]">there is no data!</tr>
                    :
                    data.map((item: T, index) => (
                        <tr className="cursor-pointer hover:bg-gray-100" role="button" onClick={() => handleClickRow?.(item)} key={index}>
                            {
                                columns.map((col, colIndex) => {
                                    const key = col.name as keyof T;
                                    return (
                                        <td className="border-b border-slate-100 p-4 pl-8 text-gray-500" key={`${index}${colIndex}`}>
                                            {item[key] as string | number | null | undefined}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}