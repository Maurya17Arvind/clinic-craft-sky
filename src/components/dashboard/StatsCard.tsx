import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatsCard({ title, value, change, icon, trend = "neutral", className }: StatsCardProps) {
  return (
    <Card className={cn("shadow-card hover:shadow-medical transition-shadow duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}