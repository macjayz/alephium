// Mock data for the Alephium DEX Analytics demo

export const mockKPIs = {
  volume24h: "$2.4M",
  volume7d: "$14.2M",
  tvl: "$8.7M",
  activeWallets: "1,247",
  trades24h: "3,892",
};

export const mockVolumeData = [
  { date: "Jan 1", volume: 1200000 },
  { date: "Jan 2", volume: 1450000 },
  { date: "Jan 3", volume: 980000 },
  { date: "Jan 4", volume: 1680000 },
  { date: "Jan 5", volume: 2100000 },
  { date: "Jan 6", volume: 1890000 },
  { date: "Jan 7", volume: 2400000 },
  { date: "Jan 8", volume: 2150000 },
  { date: "Jan 9", volume: 1920000 },
  { date: "Jan 10", volume: 2350000 },
  { date: "Jan 11", volume: 2680000 },
  { date: "Jan 12", volume: 2420000 },
  { date: "Jan 13", volume: 2890000 },
  { date: "Jan 14", volume: 2560000 },
];

export const mockTradesData = [
  { date: "Jan 1", trades: 2450 },
  { date: "Jan 2", trades: 2890 },
  { date: "Jan 3", trades: 2100 },
  { date: "Jan 4", trades: 3200 },
  { date: "Jan 5", trades: 3650 },
  { date: "Jan 6", trades: 3420 },
  { date: "Jan 7", trades: 3892 },
];

export const mockPoolVolumeData = [
  { name: "ALPH/USDT", value: 45, color: "hsl(var(--chart-1))" },
  { name: "ALPH/USDC", value: 30, color: "hsl(var(--chart-2))" },
  { name: "ALPH/ETH", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 10, color: "hsl(var(--chart-4))" },
];

export const mockPools = [
  {
    id: 1,
    name: "ALPH / USDT",
    token1: "ALPH",
    token2: "USDT",
    tvl: "$3,450,000",
    tvlValue: 3450000,
    volume24h: "$1,080,000",
    volume24hValue: 1080000,
    fees: "$3,240",
    apr: "24.5%",
    aprValue: 24.5,
  },
  {
    id: 2,
    name: "ALPH / USDC",
    token1: "ALPH",
    token2: "USDC",
    tvl: "$2,890,000",
    tvlValue: 2890000,
    volume24h: "$720,000",
    volume24hValue: 720000,
    fees: "$2,160",
    apr: "18.2%",
    aprValue: 18.2,
  },
  {
    id: 3,
    name: "ALPH / ETH",
    token1: "ALPH",
    token2: "ETH",
    tvl: "$1,560,000",
    tvlValue: 1560000,
    volume24h: "$360,000",
    volume24hValue: 360000,
    fees: "$1,080",
    apr: "12.8%",
    aprValue: 12.8,
  },
  {
    id: 4,
    name: "ALPH / WBTC",
    token1: "ALPH",
    token2: "WBTC",
    tvl: "$520,000",
    tvlValue: 520000,
    volume24h: "$145,000",
    volume24hValue: 145000,
    fees: "$435",
    apr: "9.4%",
    aprValue: 9.4,
  },
  {
    id: 5,
    name: "USDT / USDC",
    token1: "USDT",
    token2: "USDC",
    tvl: "$280,000",
    tvlValue: 280000,
    volume24h: "$95,000",
    volume24hValue: 95000,
    fees: "$95",
    apr: "4.2%",
    aprValue: 4.2,
  },
];

export const mockWallets = [
  {
    address: "1DrDy...8xK4m",
    fullAddress: "1DrDyUQoLzS6Mv6p2N4mW3jZQR5n8xK4m",
    role: "Whale",
    netFlow: "+$245,000",
    netFlowValue: 245000,
    flowType: "positive" as const,
    tradeCount: 156,
  },
  {
    address: "1HkPq...9zT2n",
    fullAddress: "1HkPqRmBvC3wS4xN5jK7yL8dF6gH9zT2n",
    role: "LP",
    netFlow: "+$89,500",
    netFlowValue: 89500,
    flowType: "positive" as const,
    tradeCount: 42,
  },
  {
    address: "1MnBv...4wE1r",
    fullAddress: "1MnBvCxZaS2dF3gH4jK5lP6qR7tY8uI4wE1r",
    role: "Trader",
    netFlow: "-$12,340",
    netFlowValue: -12340,
    flowType: "negative" as const,
    tradeCount: 287,
  },
  {
    address: "1QwEr...7yU3i",
    fullAddress: "1QwErTyUiOpAsDfGhJkLzXcVbNm7yU3i",
    role: "Trader",
    netFlow: "+$5,670",
    netFlowValue: 5670,
    flowType: "positive" as const,
    tradeCount: 89,
  },
  {
    address: "1ZxCv...2pL8k",
    fullAddress: "1ZxCvBnMaSdFgHjKlQwErTyUiOp2pL8k",
    role: "Whale",
    netFlow: "-$178,900",
    netFlowValue: -178900,
    flowType: "negative" as const,
    tradeCount: 23,
  },
  {
    address: "1PoIu...5tR6y",
    fullAddress: "1PoIuYtReWqAsDfGhJkLzXcVbNm5tR6y",
    role: "LP",
    netFlow: "+$34,200",
    netFlowValue: 34200,
    flowType: "positive" as const,
    tradeCount: 12,
  },
];

export const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Demo & Grant Application",
    status: "current" as const,
    items: [
      "Mock data dashboard implementation",
      "UI/UX design and prototyping",
      "Grant proposal submission",
    ],
  },
  {
    phase: "Phase 2",
    title: "On-Chain Indexing",
    status: "upcoming" as const,
    items: [
      "Live on-chain indexing after Alephium Phase 2 DEX launch",
      "Real-time trade and liquidity tracking",
      "Historical data aggregation",
    ],
  },
  {
    phase: "Phase 3",
    title: "Advanced Analytics",
    status: "upcoming" as const,
    items: [
      "Wallet behavior analytics",
      "LP position tracking",
      "Impermanent loss calculator",
    ],
  },
  {
    phase: "Phase 4",
    title: "Public API",
    status: "upcoming" as const,
    items: [
      "Public API for developers",
      "WebSocket real-time feeds",
      "Data export capabilities",
    ],
  },
];

// Token data with candlestick charts
export interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TokenData {
  symbol: string;
  name: string;
  price: string;
  priceValue: number;
  change24h: string;
  changeType: "positive" | "negative";
  volume24h: string;
  marketCap: string;
  candlesticks: CandlestickData[];
}

const generateCandlesticks = (basePrice: number, volatility: number): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const change = (Math.random() - 0.48) * volatility;
    const open = currentPrice;
    const close = currentPrice * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.3);
    const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.3);
    const volume = Math.floor(Math.random() * 5000000) + 1000000;
    
    data.push({
      date: dateStr,
      open: Number(open.toFixed(4)),
      high: Number(high.toFixed(4)),
      low: Number(low.toFixed(4)),
      close: Number(close.toFixed(4)),
      volume,
    });
    
    currentPrice = close;
  }
  
  return data;
};

export const mockTokens: TokenData[] = [
  {
    symbol: "ALPH",
    name: "Alephium",
    price: "$1.24",
    priceValue: 1.24,
    change24h: "+5.67%",
    changeType: "positive",
    volume24h: "$12.4M",
    marketCap: "$124M",
    candlesticks: generateCandlesticks(1.24, 0.08),
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    price: "$1.00",
    priceValue: 1.00,
    change24h: "+0.01%",
    changeType: "positive",
    volume24h: "$45.2M",
    marketCap: "$83B",
    candlesticks: generateCandlesticks(1.00, 0.002),
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: "$1.00",
    priceValue: 1.00,
    change24h: "-0.02%",
    changeType: "negative",
    volume24h: "$38.1M",
    marketCap: "$52B",
    candlesticks: generateCandlesticks(1.00, 0.002),
  },
  {
    symbol: "ETH",
    name: "Wrapped Ethereum",
    price: "$3,456.78",
    priceValue: 3456.78,
    change24h: "+2.34%",
    changeType: "positive",
    volume24h: "$8.9M",
    marketCap: "$415B",
    candlesticks: generateCandlesticks(3456.78, 0.05),
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    price: "$67,890.12",
    priceValue: 67890.12,
    change24h: "-1.23%",
    changeType: "negative",
    volume24h: "$4.2M",
    marketCap: "$1.3T",
    candlesticks: generateCandlesticks(67890.12, 0.04),
  },
];
