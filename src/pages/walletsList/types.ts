export type IWallet = {
    "walletAddress": string,
    "networkId": string,
    "winRate": number,
    "netProfit": number,
    "avgHoldingTime": number,
    "buyAmountLabel": string,
    "totalScore": number,
    "age": number,
    "dayActive": number,
    "SwapTime": [
        string
    ],
    "TotalFee": number,
    "BotActivity": string,
    "details": string,
    "totalnumPartiallyClosedData": number,
    "totalNumofFullyOpenedData": number,
    "totalTransactions": number,
    "HotTokenHolders": string[],
    "firstTopTokenHolder": string,
    "rank": number
}

export type ITableData = { [key in number]: IWallet[] }