import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table"
import { E_API_PAGE_LIMIT } from "@/pages/walletsList/constants";
import { ITableData, IWallet } from "@/pages/walletsList/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WalletsList = () => {
    const [data, setData] = useState<ITableData>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState<{ asc: boolean; column?: string }>({ asc: true, column: undefined });
    const navigate = useNavigate()
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page: number) => {
        if (data[page]) {
            if (sort.column)
                handleSort(sort.column, sort.asc)
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/valuable_wallets?network=eth&page=${page}&limit=${E_API_PAGE_LIMIT}`);
            const result = await response.json();
            if (sort.column)
                setData(prevData => ({ ...prevData, [page]: handleSort(sort.column || "", sort.asc, result) }));
            else
                setData(prevData => ({ ...prevData, [page]: result }));

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSort = (columnName: string, asc: boolean, localData?: IWallet[]): IWallet[] => {
        setSort({ asc, column: columnName })
        const tmp = localData || [...data[currentPage]];
        tmp.sort((a, b) => {
            if (asc) {
                return a[columnName as keyof IWallet] > b[columnName as keyof IWallet] ? 1 : -1;
            } else {
                return a[columnName as keyof IWallet] < b[columnName as keyof IWallet] ? 1 : -1;
            }
        });
        setData({
            ...data,
            [currentPage]: tmp
        });

        return tmp;
    }
    const handleClickRow = (item: IWallet) => {
        navigate(item.walletAddress)
    }

    return (
        <div className="px-4 py-6">
            <div className="p-4 border border-gray-300 rounded-md">
                <h1 className="text-center font-bold text-lg mb-6">Wallets List</h1>
                <Table<IWallet> columns={[
                    {
                        label: "Net Profit",
                        name: "netProfit",
                        sortable: true
                    },
                    {
                        label: "Wallet Address",
                        name: "walletAddress"
                    }
                ]}
                    data={data[currentPage]}
                    loading={loading}
                    sortOrder={sort.asc}
                    handleSort={handleSort}
                    handleClickRow={handleClickRow}
                />
                <Pagination className="mt-4" page={currentPage} handleNext={() => setCurrentPage(currentPage + 1)} handlePrev={() => setCurrentPage(currentPage - 1)} />
            </div>
        </div>
    )
}
export default WalletsList