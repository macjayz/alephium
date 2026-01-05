import { roadmapItems } from "@/lib/mockData";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export default function Roadmap() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "current":
        return <Clock className="h-5 w-5 text-primary animate-pulse-glow" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-success/30 bg-success/5";
      case "current":
        return "border-primary/30 bg-primary/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Development Roadmap</h1>
        <p className="text-muted-foreground">Future implementation milestones</p>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <p className="text-sm text-warning">
          <span className="font-semibold">Notice:</span> This application currently uses mock data. 
          Live data and indexing will be implemented post-grant and once Alephium DEX contracts 
          are available.
        </p>
      </div>

      <div className="space-y-6">
        {roadmapItems.map((item, index) => (
          <div
            key={item.phase}
            className={`relative border rounded-lg p-6 ${getStatusColor(item.status)}`}
          >
            {/* Connector line */}
            {index < roadmapItems.length - 1 && (
              <div className="absolute left-8 top-full w-px h-6 bg-border" />
            )}

            <div className="flex items-start gap-4">
              <div className="mt-0.5">{getStatusIcon(item.status)}</div>
              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {item.phase}
                  </span>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                </div>
                <ul className="space-y-2">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      {listItem}
                    </li>
                  ))}
                </ul>
                {item.status === "current" && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                    In Progress
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stat-card gradient-border space-y-4">
        <h3 className="font-semibold">Key Implementation Goals</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-foreground font-medium">Post-Launch Features</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Real-time trade tracking</li>
              <li>• Liquidity depth analysis</li>
              <li>• Price impact calculator</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-foreground font-medium">Developer Tools</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• REST & GraphQL APIs</li>
              <li>• WebSocket feeds</li>
              <li>• SDK integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
