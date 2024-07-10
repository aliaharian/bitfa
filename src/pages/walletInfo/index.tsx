import { chartData, chartOptions } from "@/pages/walletInfo/constants";
import { IWalletInfo } from "@/pages/walletInfo/types";
import { ArrowLeft } from "iconsax-react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router-dom"

const WalletInfo = () => {
    const { wallet } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState<Partial<IWalletInfo>>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        !data && fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/walletsummary/${wallet}?network=eth`);
            const result = await response.json();
            setData(result);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleBack = () => {
        navigate("/")
    }


    return (
        <div className="w-full p-8 max-md:px-2">
            <div className="w-full p-4 border border-gray-300 rounded-lg max-md:px-2">
                <div className="w-full flex items-center justify-between max-md:flex-col  mb-6">
                    <ArrowLeft role="button" onClick={handleBack} variant="Bold" className="text-gray-500 w-10 h-10" />
                    <h1 className="font-bold text-lg max-w-full truncate">Details of Wallet: {wallet}</h1>
                </div>

                {data && !loading ?
                    <Line
                        data={chartData({ data }) as any}
                        options={chartOptions as any}
                    />
                    :
                    <div className="w-full min-h-[300px] flex items-center justify-center">

                    <p className="text-lg">Please Wait...</p>
                    </div>

                }
            </div>
        </div>
    )
}
export default WalletInfo