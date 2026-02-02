"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BarChart() {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !hasAnimated) {
          setChartData([60, 75, 60, 90, 65, 80, 95]);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "#ba68c8");
    gradient.addColorStop(1, "#00d9ff");
    return gradient;
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Data Processed",
        data: chartData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2500,
      easing: "easeOutQuart",
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#64748b" } },
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#64748b", maxTicksLimit: 5 },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
}
