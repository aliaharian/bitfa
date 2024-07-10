import { IWalletInfo } from "@/pages/walletInfo/types";
import { numberFormat } from "@/utils";

export const generateBarColors = (buyAmounts: number[], sellAmounts: number[], secondaryColor?: boolean) => {
    return sellAmounts.map((sellAmount, index) => {
        if (secondaryColor)
            return sellAmount > buyAmounts[index] ? '#b2ddf7' : '#f53f36';
        else
            return sellAmount > buyAmounts[index] ? '#2a752a' : '#b2ddf7';
    });
};

export const chartOptions = {
    responsive: true,
    showTooltips: true,
    multiTooltipTemplate: "<%= value %>",
    plugins: {
        tooltip: {
            enabled: true,
            intersect: false,
            mode: 'index',
            callbacks: {
                title: (tooltipItems: any) => {
                    const datasetIndex = tooltipItems[0].datasetIndex;
                    if (datasetIndex === 0) {
                        return 'Sell and Buy Times';
                    }
                    return tooltipItems[0].label;
                },
                label: (tooltipItem: any) => {
                    const datasetIndex = tooltipItem.datasetIndex;
                    const value = tooltipItem.raw;
                    if (datasetIndex === 1) {
                        return `Buy Amount: $${value}`;
                    } else if (datasetIndex === 2) {
                        return `Sell Amount: $${value}`;
                    }
                    return value + '';
                }
            },
        }
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'right',
            suggestedMin: 0,
            ticks: {
                color: "rgba(0, 0, 0, 1)",
            },
            grid: {
                drawBorder: true,
                drawTicks: true,
                color: "rgba(0, 0, 0, 0.2)",
            },
            title: {
                display: true,
                // text: "BUy and Sell Times",
                font: {
                    size: 17
                },
            },
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'left',
            suggestedMin: 0,
            ticks: {
                callback: function (value: string) {
                    return '$' + numberFormat(value);
                }
            },
            title: {
                display: true,
                // text: "Buy/Sell Price",
                font: {
                    size: 17
                },
            },

        },
        x: {
            stacked: true
        }

    },
    interaction: {
        mode: "point"
    }
}

export const chartData = ({ data }: {
    data: Partial<IWalletInfo>
}) => {
    const buyAmounts: number[] = Object.values(data.totalBuyAmounts?.month || {})
    const sellAmounts: number[] = Object.values(data.totalSellAmounts?.month || {})

    return ({
        labels: Object.keys(data.totalBuySellTimes?.month || []),
        datasets: [
            {
                label: "Line value",
                data: Object.values(data.totalBuySellTimes?.month || []),
                borderColor: `#6eafff`,
                backgroundColor: `#6eafff`,
                yAxisID: 'y',
            },
            {
                type: 'bar',
                label: "bar value",
                data: buyAmounts,
                yAxisID: 'y1',
                borderColor: generateBarColors(buyAmounts, sellAmounts, true),
                backgroundColor: generateBarColors(buyAmounts, sellAmounts, true),
            },
            {
                type: 'bar',
                label: "bar2 value",
                data: sellAmounts,
                yAxisID: 'y1',
                borderColor: generateBarColors(buyAmounts, sellAmounts),
                backgroundColor: generateBarColors(buyAmounts, sellAmounts),
            }
        ],
    })
}