"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BarChart from "./DashboardChart";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardCard from "./DashboardCard";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: "Data Processed", value: "847.2K", change: "↑ 23% this week" },
  { label: "Active Insights", value: "142", change: "↑ 8 new today" },
  { label: "Automation Rate", value: "94.7%", change: "↑ 2.3% improvement" },
  { label: "Response Time", value: "47ms", change: "↓ 12ms faster" },
];

export default function Dashboard() {
  useEffect(() => {
    gsap.from(".dashboard-container", {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".dashboard-container",
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section id="dashboard" className="py-20 px-4  bg-[#30364F]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-text mb-4">
            Intelligence Dashboard
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mt-2">
            Your command center for data-driven decisions
          </p>
        </div>

        <div className="dashboard-container bg-primary rounded-3xl overflow-hidden border border-cyan-600/10  shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
          <DashboardHeader />

          <div className="dashboard-body flex flex-col md:flex-row min-h-[600px]">
            <DashboardSidebar />

            <main className="dashboard-main flex-1 p-12 bg-[#0A0E27]">
              <h2 className="dashboard-title text-2xl font-bold text-white mb-2">
                Overview
              </h2>
              <p className="dashboard-subtitle text-gray-400 mb-12">
                Real-time intelligence across your data ecosystem
              </p>

              <DashboardCard />

              <div className="chart-container mt-8">
                <div className="bg-surface border border-cyan-300/20 rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden h-[400px]">
                  <BarChart />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
