"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntelligenceChart from "./DashboardChart";
import DashboardCard from "./DashboardCard";

gsap.registerPlugin(ScrollTrigger);

const chartHeights = ["60%", "75%", "45%", "90%", "65%", "80%", "95%"];

export default function Dashboard() {
  useEffect(() => {
    // Animate dashboard container
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

    // Animate chart bars
    gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
      gsap.from(bar, {
        scaleY: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
        transformOrigin: "bottom",
        scrollTrigger: {
          trigger: ".chart-container",
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <section className="py-20 px-4 bg-[#607B8F]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-2">
            Intelligence Dashboard
          </h2>
          <p className="text-textMuted text-lg max-w-xl mx-auto">
            Your command center for data-driven decisions
          </p>
        </div>

        <div className="dashboard-container bg-primary rounded-3xl overflow-hidden border border-border shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="dashboard-header flex justify-between items-center p-6 border-b border-border bg-[rgba(26,31,58,0.5)] backdrop-blur-md">
            <div className="dashboard-logo font-mono text-accent text-xl md:text-2xl font-bold">
              XAI
            </div>
            <nav className="flex gap-8">
              {["Overview", "Analytics", "Workflows", "Settings"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className={`${idx === 0 ? "text-accent relative" : "text-textMuted"} hover:text-text transition-colors`}
                  >
                    {item}
                    {idx === 0 && (
                      <span className="absolute bottom-[-0.5rem] left-0 right-0 h-0.5 bg-accent"></span>
                    )}
                  </a>
                ),
              )}
            </nav>
          </div>

          {/* Body */}
          <div className="dashboard-body flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar */}
            <aside className="dashboard-sidebar w-full md:w-72 p-6 border-b md:border-b-0 md:border-r border-border bg-[rgba(20,25,54,0.5)]">
              <div className="sidebar-section mb-8">
                <h4 className="text-textMuted text-xs uppercase mb-3 tracking-wide">
                  Workspace
                </h4>
                {["Dashboard", "Data Sources", "Workflows", "Reports"].map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className={`sidebar-item flex items-center gap-3 px-3 py-2 rounded-md mb-2 cursor-pointer transition-all ${idx === 0 ? "active bg-[rgba(0,217,255,0.1)] border-l-4 border-accent text-accent" : "text-textMuted hover:bg-[rgba(0,217,255,0.05)] hover:text-text"}`}
                    >
                      <span>{["📊", "🔍", "⚡", "📈"][idx]}</span>
                      <span>{item}</span>
                    </div>
                  ),
                )}
              </div>

              <div className="sidebar-section">
                <h4 className="text-textMuted text-xs uppercase mb-3 tracking-wide">
                  Intelligence
                </h4>
                {["Insights", "Alerts", "Automations"].map((item, idx) => (
                  <div
                    key={idx}
                    className="sidebar-item flex items-center gap-3 px-3 py-2 rounded-md mb-2 cursor-pointer text-textMuted hover:bg-[rgba(0,217,255,0.05)] hover:text-text"
                  >
                    <span>{["🎯", "🔔", "🤖"][idx]}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main */}
            <DashboardCard />
            <IntelligenceChart />
          </div>
        </div>
      </div>
    </section>
  );
}
