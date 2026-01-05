import { ArrowRight, BarChart3, Database, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Overview() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 demo-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse-glow" />
          Mock Data • Demo Only
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Alephium DEX{" "}
          <span className="text-gradient">Analytics</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl">
          On-chain analytics and discovery layer for Alephium DeFi. 
          Track liquidity, volume, and wallet activity across the ecosystem.
        </p>

        <div className="bg-card border border-border rounded-lg p-4 max-w-xl">
          <p className="text-sm text-muted-foreground">
            <span className="text-warning font-medium">Demo Preview:</span>{" "}
            This application demonstrates the proposed analytics infrastructure 
            for the Alephium Phase 2 DEX. All displayed data is simulated for 
            demonstration purposes only.
          </p>
        </div>

        <div className="flex gap-4 pt-2">
          <Button asChild>
            <Link to="/dashboard">
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/roadmap">
              See Roadmap
            </Link>
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="stat-card gradient-border space-y-3">
          <div className="p-2 rounded-lg bg-primary/10 w-fit">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">DEX Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Track trading volume, TVL, and market metrics across all Alephium DEX pools.
          </p>
        </div>

        <div className="stat-card gradient-border space-y-3">
          <div className="p-2 rounded-lg bg-primary/10 w-fit">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Pool Discovery</h3>
          <p className="text-sm text-muted-foreground">
            Explore liquidity pools with detailed metrics including APR, fees, and historical data.
          </p>
        </div>

        <div className="stat-card gradient-border space-y-3">
          <div className="p-2 rounded-lg bg-primary/10 w-fit">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Wallet Insights</h3>
          <p className="text-sm text-muted-foreground">
            Analyze wallet behavior, identify whales, and track liquidity provider activity.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Proposed Infrastructure</h2>
        <div className="flex flex-wrap gap-2">
          {["On-Chain Indexer", "Real-Time API", "Historical Database", "WebSocket Feeds"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-muted rounded-md text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
