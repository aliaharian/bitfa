export interface IWalletInfo {
    highestProfit: [number, string, string];
    lowestProfit: [number, string, string];
    highestLoss: [number, string, string];
    lowestLoss: [number, string, string];
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
    totalProfits: TimeBasedMetrics;
    totalBuySellTimes: TimeBasedMetrics;
    totalBuyAmounts: TimeBasedMetrics;
    totalSellAmounts: TimeBasedMetrics;
    totalBuyTimes: TimeBasedMetrics;
    totalSellTimes: TimeBasedMetrics;
    percentageWeek: Record<string, number>;
    percentageMonth: Record<string, number>;
    percentageYear: Record<string, number>;
    averageHoldingTimes: Record<string, TokenHoldingTime>;
    totalProfitsPerToken: Record<string, TokenProfit>;
    most5TradedTokens: Record<string, TokenTrade>;
    top5ProfitableTokens: Record<string, TokenProfit>;
    overallAverageHoldingTimeAndProfit: AverageHoldingTimeAndProfit;
    mostProfitableTokenWithShortestOpeningTime: MostProfitableToken;
    swapTimeResults: SwapTimeResults;
    avgHoldingTime: string;
    avgProfit: number;
    avgBuyAmount: number;
    holdingTimeLabel: string;
    profitLabel: string;
    buyAmountLabel: string;
    holdingTimeScore: number;
    profitScore: number;
    sizeScore: number;
    totalScore: number;
    winRate: string;
    totalProfitableSwaps: number;
    totalNegativeSwaps: number;
    totalPositions: number;
    newestBoughtToken: TokenEvent;
    newestSoldToken: TokenEvent;
    formattedNewestBoughtToken: TokenEvent;
    formattedNewestSoldToken: TokenEvent;
    transactionMetrics: TransactionMetrics;
  }
  
  interface TimeBasedMetrics {
    month: Record<string, number>;
    week: Record<string, number>;
    year: Record<string, number>;
  }
  
  interface TokenHoldingTime {
    averageHoldingTime: string;
    currencyAddress: string;
  }
  
  interface TokenProfit {
    profit: number;
    currencyAddress: string;
    buyAmount: number;
    buyTimes: number;
    sellTimes: number;
    totalTrades: number;
  }
  
  interface TokenTrade extends TokenProfit {
    totalTrades: number;
  }
  
  interface AverageHoldingTimeAndProfit {
    HoldingTime: string;
    Profit: number;
    BuyAmount: number;
  }
  
  interface MostProfitableToken {
    tokenName: string;
    profit: number;
    averageHoldingTime: string;
    currencyAddress: string;
  }
  
  interface SwapTimeResults {
    longestTime: string;
    shortestTime: string;
    longestTokenInfo: TokenEventDetails;
    shortestTokenInfo: TokenEventDetails;
  }
  
  interface TokenEvent {
    tokenName: string;
    currencyAddress: string;
    buyTime?: string;
    sellTime?: string;
    profit?: number;
  }
  
  interface TokenEventDetails extends TokenEvent {
    averageHoldingTime: string;
  }
  
  interface TransactionMetrics {
    totalTransactions: number;
    latestTransaction: LatestTransaction;
  }
  
  interface LatestTransaction {
    time: string;
  }
  