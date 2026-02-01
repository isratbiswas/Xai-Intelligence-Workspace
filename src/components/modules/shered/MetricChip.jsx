export const MetricChip = ({ label, val, change }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors">
    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-mono">
      {label}
    </div>
    <div className="text-2xl font-bold text-white">{val}</div>
    <div
      className={`text-[10px] ${change.includes("↑") ? "text-cyan-400" : "text-rose-400"}`}
    >
      {change}
    </div>
  </div>
);
