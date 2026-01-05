import { useState, useMemo } from "react";
import { mockWallets } from "@/lib/mockData";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortField = "address" | "netFlow" | "tradeCount";
type SortOrder = "asc" | "desc";

export default function Wallets() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("netFlow");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Whale":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      case "LP":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30";
      case "Trader":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredAndSortedWallets = useMemo(() => {
    let filtered = mockWallets.filter((wallet) => {
      const matchesSearch = 
        wallet.address.toLowerCase().includes(search.toLowerCase()) ||
        wallet.fullAddress.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = roleFilter === "all" || wallet.role === roleFilter;
      
      return matchesSearch && matchesRole;
    });

    return filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case "address":
          aValue = a.address;
          bValue = b.address;
          break;
        case "netFlow":
          aValue = Math.abs(a.netFlowValue);
          bValue = Math.abs(b.netFlowValue);
          break;
        case "tradeCount":
          aValue = a.tradeCount;
          bValue = b.tradeCount;
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
  }, [search, roleFilter, sortField, sortOrder]);

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

  const roleStats = useMemo(() => {
    const stats = { Whale: 0, LP: 0, Trader: 0 };
    mockWallets.forEach((w) => {
      if (w.role in stats) stats[w.role as keyof typeof stats]++;
    });
    return stats;
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Wallet Activity</h1>
        <p className="text-muted-foreground">Sample wallet behavior with simulated addresses</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by wallet address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-44 bg-card border-border">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Whale">Whale</SelectItem>
            <SelectItem value="LP">LP</SelectItem>
            <SelectItem value="Trader">Trader</SelectItem>
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
                    onClick={() => toggleSort("address")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Wallet Address <SortIcon field="address" />
                  </button>
                </th>
                <th>Role</th>
                <th>
                  <button 
                    onClick={() => toggleSort("netFlow")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Net Flow (7d) <SortIcon field="netFlow" />
                  </button>
                </th>
                <th>
                  <button 
                    onClick={() => toggleSort("tradeCount")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Trade Count <SortIcon field="tradeCount" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedWallets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted-foreground py-8">
                    No wallets match your search criteria
                  </td>
                </tr>
              ) : (
                filteredAndSortedWallets.map((wallet) => (
                  <tr key={wallet.address} className="group">
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            {wallet.address.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-foreground">{wallet.address}</span>
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            {wallet.fullAddress}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${getRoleBadgeVariant(wallet.role)}`}>
                        {wallet.role}
                      </span>
                    </td>
                    <td>
                      <span className={wallet.flowType === "positive" ? "text-success" : "text-destructive"}>
                        {wallet.netFlow}
                      </span>
                    </td>
                    <td className="text-muted-foreground">{wallet.tradeCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <p className="text-2xl font-bold font-mono text-chart-3">{roleStats.Whale}</p>
          <p className="text-sm text-muted-foreground">Whale Wallets</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold font-mono text-chart-2">{roleStats.LP}</p>
          <p className="text-sm text-muted-foreground">Liquidity Providers</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold font-mono text-chart-1">{roleStats.Trader}</p>
          <p className="text-sm text-muted-foreground">Active Traders</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Showing {filteredAndSortedWallets.length} of {mockWallets.length} wallets • All data is simulated
      </p>
    </div>
  );
}
