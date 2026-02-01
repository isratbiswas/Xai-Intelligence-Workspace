"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Cell,
  XAxis,
} from "recharts";

const data = [
  { name: "Mon", value: 60 },
  { name: "Tue", value: 75 },
  { name: "Wed", value: 45 },
  { name: "Thu", value: 90 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 80 },
  { name: "Sun", value: 95 },
];

export default function IntelligenceChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="chart-container bg-[#0B0F1A]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-80 relative group">
      {/* Decorative Glow Background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF6B95" stopOpacity={0.4} />
            </linearGradient>
            {/* Hover state gradient - brighter and more saturated */}
            <linearGradient id="hoverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FBFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF2E70" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#1A1F3A] border border-cyan-500/30 p-3 rounded-lg shadow-2xl backdrop-blur-md animate-in fade-in zoom-in duration-200">
                    <p className="text-white font-bold">{`${payload[0].value} units`}</p>
                    <p className="text-cyan-400 text-xs uppercase tracking-tighter">
                      Real-time Data
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar
            dataKey="value"
            radius={[6, 6, 2, 2]}
            // UNIQUE ANIMATION SETTINGS
            isAnimationActive={true}
            animationBegin={200}
            animationDuration={1500}
            animationEasing="ease-out"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={
                  activeIndex === index
                    ? "url(#hoverGradient)"
                    : "url(#barGradient)"
                }
                // Staggered opacity effect
                fillOpacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.3
                }
                style={{
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  filter:
                    activeIndex === index
                      ? "drop-shadow(0px 0px 8px rgba(0, 217, 255, 0.5))"
                      : "none",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
