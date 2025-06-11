"use client";

import { BarChart, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { TimeAllocationData } from "@/lib/types";
import { TrendingUp, PieChartIcon } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip as ShadCNChartTooltip, ChartTooltipContent as ShadCNChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { useState, useEffect } from "react";

interface TimeAllocationChartProps {
  summary: string; // Expected format: "Subject1: X%, Subject2: Y%, ..." or "Subject1: X hours, Subject2: Y hours, ..."
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const parseSummary = (summary: string): TimeAllocationData[] => {
  if (!summary || typeof summary !== 'string') return [];
  const allocations: TimeAllocationData[] = [];
  const parts = summary.split(',').map(part => part.trim());
  
  parts.forEach((part, index) => {
    const [subjectWithMaybeHours, valueStr] = part.split(':').map(s => s.trim());
    let subject = subjectWithMaybeHours;
    let value = parseFloat(valueStr);

    if (valueStr && (valueStr.includes('%') || valueStr.toLowerCase().includes('hours') || valueStr.toLowerCase().includes('hour'))) {
       value = parseFloat(valueStr.replace(/%|hours|hour/gi, '').trim());
    } else if (!valueStr && subjectWithMaybeHours.includes(" ")) { // Fallback if no colon, e.g. "Math 10 hours"
        const lastSpaceIndex = subjectWithMaybeHours.lastIndexOf(" ");
        subject = subjectWithMaybeHours.substring(0, lastSpaceIndex);
        const potentialValueStr = subjectWithMaybeHours.substring(lastSpaceIndex + 1);
        value = parseFloat(potentialValueStr.replace(/%|hours|hour/gi, '').trim());
    }

    if (subject && !isNaN(value)) {
      allocations.push({
        subject: subject,
        hours: value, // Assuming value represents hours or a proportional figure
        fill: COLORS[index % COLORS.length],
      });
    }
  });
  return allocations;
};


export function TimeAllocationChart({ summary }: TimeAllocationChartProps) {
  const [chartData, setChartData] = useState<TimeAllocationData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const parsedData = parseSummary(summary);
    setChartData(parsedData);

    const newChartConfig: ChartConfig = {};
    parsedData.forEach(item => {
      newChartConfig[item.subject] = {
        label: item.subject,
        color: item.fill,
      };
    });
    setChartConfig(newChartConfig);

  }, [summary]);


  if (chartData.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Time Allocation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No time allocation data available to display a chart. Raw summary:</p>
          <p className="mt-2 p-3 bg-muted rounded-md text-sm">{summary || "Summary not provided."}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Determine if data is percentage or absolute hours for labeling
  const isPercentage = summary.includes('%');
  const dataKeyLabel = isPercentage ? "Percentage" : "Hours";

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-primary" />
          Time Allocation Summary
        </CardTitle>
        <CardDescription>
          Visual breakdown of your study time per subject.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-headline text-xl mb-4 flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5 text-accent" />
              Subject Distribution
            </h3>
            <ChartContainer config={chartConfig} className="aspect-square h-[250px] w-full">
              <RechartsPieChart>
                <ShadCNChartTooltip content={<ShadCNChartTooltipContent nameKey="subject" hideLabel />} />
                <Pie data={chartData} dataKey="hours" nameKey="subject" cx="50%" cy="50%" outerRadius={80} label>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent />} />
              </RechartsPieChart>
            </ChartContainer>
          </div>
          <div>
             <h3 className="font-headline text-xl mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-accent" />
              {dataKeyLabel} per Subject
            </h3>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="subject" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}${isPercentage ? '%' : ''}`} />
                <ShadCNChartTooltip cursor={false} content={<ShadCNChartTooltipContent indicator="dashed" />} />
                <Bar dataKey="hours" name={dataKeyLabel} radius={4}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
         <div className="mt-6">
            <h3 className="font-headline text-lg">Raw Summary:</h3>
            <p className="mt-1 p-3 bg-muted rounded-md text-sm">{summary}</p>
          </div>
      </CardContent>
    </Card>
  );
}
