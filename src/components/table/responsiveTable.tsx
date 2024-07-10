import { IColumn, TableProps } from "@/components/table/types";
import { ArrowDown2 } from "iconsax-react";

export function ResponsiveTable<T>({ data, columns, sortOrder, _handleSort, handleClickRow }: TableProps<T> & { _handleSort: (col: IColumn) => void; }) {

    return (
        <div className="w-full">
            {
                !data ?
                    <p>There is No Data!</p>
                    :
                    data.map((item, index) => {
                        return (
                            <div key={`${index}`} role="button" onClick={() => handleClickRow?.(item)} className="my-4 p-4 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md flex flex-col gap-y-3">
                                {
                                    columns.map((col, colIndex) => {
                                        const key = col.name as keyof T;
                                        return (
                                            <div key={`${index}${colIndex}`} className="grid grid-cols-5 gap-2">
                                                <div role="button" onClick={(e) => { e.stopPropagation(); _handleSort(col) }} className={`text-sm font-bold col-span-2 flex items-center ${col.sortable ? "cursor-pointer" : ""}`}>
                                                    {col.label} {col.sortable && <ArrowDown2 variant="Bold" className={`w-3 h-3 ${sortOrder ? "rotate-180" : ""}`} />}
                                                </div>
                                                <div className="text-sm overflow-scroll col-span-3">
                                                    {item[key] as string | number | null | undefined}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
            }
        </div>
    )
}