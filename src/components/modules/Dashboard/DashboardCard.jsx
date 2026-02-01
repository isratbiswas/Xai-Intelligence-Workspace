import React from "react";

import { gsap } from "gsap";
const metrics = [
  { label: "Data Processed", value: "847.2K", change: "↑ 23% this week" },
  { label: "Active Insights", value: "142", change: "↑ 8 new today" },
  { label: "Automation Rate", value: "94.7%", change: "↑ 2.3% improvement" },
  { label: "Response Time", value: "47ms", change: "↓ 12ms faster" },
];
const DashboardCard = () => {
  gsap.utils.toArray(".metric-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });
  });
  return (
    <main className="dashboard-main flex-1 p-12">
      <h2 className="dashboard-title text-2xl font-bold text-text mb-2">
        Overview
      </h2>
      <p className="dashboard-subtitle text-textMuted mb-12">
        Real-time intelligence across your data ecosystem
      </p>

      {/* Metrics */}
      <div className="metrics-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="metric-card p-6 bg-surface border border-border rounded-xl cursor-pointer transition-all hover:transform hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_rgba(0,217,255,0.1)]"
          >
            <div className="metric-label text-xs text-textMuted uppercase tracking-wide mb-1">
              {metric.label}
            </div>
            <div className="metric-value text-3xl font-bold mb-1">
              {metric.value}
            </div>
            <div className="metric-change text-sm text-accent">
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-container bg-surface border border-border rounded-xl p-6 h-72 relative overflow-hidden"></div>
    </main>
  );
};

export default DashboardCard;
