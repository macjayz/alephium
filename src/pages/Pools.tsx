import { useState, useMemo } from "react";
import { mockPools } from "@/lib/mockData";
import { ArrowUpRight, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortField = "name" | "tvl" | "volume" | "apr";
type SortOrder = "asc" | "desc";

export default function Pools() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("tvl");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [minTvl, setMinTvl] = useState<string>("all");

  const filteredAndSortedPools = useMemo(() => {
    let filtered = mockPools.filter((pool) => {
      const matchesSearch = pool.name.toLowerCase().includes(search.toLowerCase()) ||
        pool.token1.toLowerCase().includes(search.toLowerCase()) ||
        pool.token2.toLowerCase().includes(search.toLowerCase());
      
      let matchesTvl = true;
      if (minTvl === "1m") matchesTvl = pool.tvlValue >= 1000000;
      else if (minTvl === "500k") matchesTvl = pool.tvlValue >= 500000;
      else if (minTvl === "100k") matchesTvl = pool.tvlValue >= 100000;
      
      return matchesSearch && matchesTvl;
    });

    return filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "tvl":
          aValue = a.tvlValue;
          bValue = b.tvlValue;
          break;
        case "volume":
          aValue = a.volume24hValue;
          bValue = b.volume24hValue;
          break;
        case "apr":
          aValue = a.aprValue;
          bValue = b.aprValue;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }
      
      return sortOrder === "asc" ? aValue - (bValue as number) : (bValue as number) - aValue;
    });
  }, [search, sortField, sortOrder, minTvl]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
    return sortOrder === "asc" 
      ? <ArrowUp className="h-3 w-3 text-primary" />
      : <ArrowDown className="h-3 w-3 text-primary" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Liquidity Pools</h1>
        <p className="text-muted-foreground">Explore DEX pools with simulated metrics</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pools by token..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
        <Select value={minTvl} onValueChange={setMinTvl}>
          <SelectTrigger className="w-full sm:w-44 bg-card border-border">
            <SelectValue placeholder="Min TVL" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All TVL</SelectItem>
            <SelectItem value="100k">TVL ≥ $100K</SelectItem>
            <SelectItem value="500k">TVL ≥ $500K</SelectItem>
            <SelectItem value="1m">TVL ≥ $1M</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="stat-card gradient-border overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-muted/30">
                <th>
                  <button 
                    onClick={() => toggleSort("name")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Pool <SortIcon field="name" />
                  </button>
                </th>
                <th>
                  <button 
                    onClick={() => toggleSort("tvl")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    TVL <SortIcon field="tvl" />
                  </button>
                </th>
                <th>
                  <button 
                    onClick={() => toggleSort("volume")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    24h Volume <SortIcon field="volume" />
                  </button>
                </th>
                <th>Fees (24h)</th>
                <th>
                  <button 
                    onClick={() => toggleSort("apr")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    APR <SortIcon field="apr" />
                  </button>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPools.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted-foreground py-8">
                    No pools match your search criteria
                  </td>
                </tr>
              ) : (
                filteredAndSortedPools.map((pool) => (
                  <tr key={pool.id} className="group cursor-pointer">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-medium text-primary">
                            {pool.token1.charAt(0)}
                          </div>
                          <div className="w-7 h-7 rounded-full bg-chart-2/20 border-2 border-card flex items-center justify-center text-xs font-medium text-chart-2">
                            {pool.token2.charAt(0)}
                          </div>
                        </div>
                        <span className="font-medium text-foreground">{pool.name}</span>
                      </div>
                    </td>
                    <td className="text-foreground">{pool.tvl}</td>
                    <td className="text-foreground">{pool.volume24h}</td>
                    <td className="text-muted-foreground">{pool.fees}</td>
                    <td>
                      <span className="text-success font-medium">{pool.apr}</span>
                    </td>
                    <td>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Showing {filteredAndSortedPools.length} of {mockPools.length} pools • All data is simulated
      </p>
    </div>
  );
}
