import React from "react";
import { LayoutDashboard, Database, Workflow, BarChart3 } from "lucide-react";

const DashboardSidebar = () => {
  return (
    <aside className="dashboard-sidebar w-full md:w-72 p-6 border-b md:border-b-0 md:border-r border-cyan-300/20 bg-[#121730]">
      <div className="sidebar-section mb-8">
        <h4 className="text-gray-400 text-xs uppercase mb-3 tracking-wide">
          Workspace
        </h4>

        {[
          { name: "Dashboard", icon: LayoutDashboard },
          { name: "Data Sources", icon: Database },
          { name: "Workflows", icon: Workflow },
          { name: "Reports", icon: BarChart3 },
        ].map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className={`sidebar-item flex items-center gap-3 px-3 py-2 rounded-md mb-2 cursor-pointer transition-all
          ${
            idx === 0
              ? "active bg-[rgba(0,217,255,0.1)] border-l-4 border-cyan-400 text-cyan-500"
              : "text-gray-400 hover:bg-[rgba(0,217,255,0.05)] hover:text-cyan-400"
          }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
