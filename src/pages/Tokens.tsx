import { useState } from "react";
import { mockTokens, TokenData, CandlestickData } from "@/lib/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

interface CandlestickProps {
  data: CandlestickData[];
  token: TokenData;
}

function CandlestickChart({ data, token }: CandlestickProps) {
  // Transform data for candlestick visualization
  const chartData = data.map((d) => ({
    ...d,
    // For the body of the candle
    bodyBottom: Math.min(d.open, d.close),
    bodyHeight: Math.abs(d.close - d.open),
    // For coloring
    isGreen: d.close >= d.open,
    // For wicks
    wickHigh: d.high,
    wickLow: d.low,
  }));

  const minPrice = Math.min(...data.map((d) => d.low)) * 0.995;
  const maxPrice = Math.max(...data.map((d) => d.high)) * 1.005;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[minPrice, maxPrice]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            tickFormatter={(value) => 
              token.priceValue >= 100 
                ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                : `$${value.toFixed(token.priceValue >= 1 ? 2 : 4)}`
            }
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: number, name: string) => {
              const formattedValue = token.priceValue >= 100 
                ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                : `$${value.toFixed(4)}`;
              return [formattedValue, name.charAt(0).toUpperCase() + name.slice(1)];
            }}
          />
          {/* Wicks */}
          {chartData.map((entry, index) => (
            <ReferenceLine
              key={`wick-${index}`}
              segment={[
                { x: entry.date, y: entry.wickLow },
                { x: entry.date, y: entry.wickHigh },
              ]}
              stroke={entry.isGreen ? "hsl(var(--success))" : "hsl(var(--destructive))"}
              strokeWidth={1}
            />
          ))}
          {/* Candle bodies */}
          <Bar
            dataKey="bodyHeight"
            stackId="candle"
            fill="transparent"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isGreen ? "hsl(var(--success))" : "hsl(var(--destructive))"}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Tokens() {
  const [selectedToken, setSelectedToken] = useState<TokenData>(mockTokens[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Token Prices</h1>
        <p className="text-muted-foreground">Price charts with simulated candlestick data</p>
      </div>

      {/* Token Selector */}
      <div className="flex flex-wrap gap-2">
        {mockTokens.map((token) => (
          <button
            key={token.symbol}
            onClick={() => setSelectedToken(token)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedToken.symbol === token.symbol
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            }`}
          >
            <span className="font-medium">{token.symbol}</span>
          </button>
        ))}
      </div>

      {/* Selected Token Chart */}
      <div className="stat-card gradient-border">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">{selectedToken.symbol.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedToken.symbol}</h2>
                <p className="text-sm text-muted-foreground">{selectedToken.name}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-mono">{selectedToken.price}</p>
            <p className={`text-sm flex items-center justify-end gap-1 ${
              selectedToken.changeType === "positive" ? "text-success" : "text-destructive"
            }`}>
              {selectedToken.changeType === "positive" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {selectedToken.change24h}
            </p>
          </div>
        </div>

        <CandlestickChart data={selectedToken.candlesticks} token={selectedToken} />

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-sm font-mono font-medium">{selectedToken.volume24h}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-sm font-mono font-medium">{selectedToken.marketCap}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Change</p>
            <p className={`text-sm font-mono font-medium ${
              selectedToken.changeType === "positive" ? "text-success" : "text-destructive"
            }`}>
              {selectedToken.change24h}
            </p>
          </div>
        </div>
      </div>

      {/* All Tokens Table */}
      <div className="stat-card gradient-border overflow-hidden p-0">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">All Tokens</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-muted/30">
                <th>Token</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Volume</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {mockTokens.map((token) => (
                <tr
                  key={token.symbol}
                  className="group cursor-pointer"
                  onClick={() => setSelectedToken(token)}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{token.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{token.symbol}</span>
                        <p className="text-xs text-muted-foreground">{token.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-foreground">{token.price}</td>
                  <td>
                    <span className={`flex items-center gap-1 ${
                      token.changeType === "positive" ? "text-success" : "text-destructive"
                    }`}>
                      {token.changeType === "positive" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {token.change24h}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{token.volume24h}</td>
                  <td className="text-muted-foreground">{token.marketCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        All token prices and charts are simulated for demonstration purposes
      </p>
    </div>
  );
}
