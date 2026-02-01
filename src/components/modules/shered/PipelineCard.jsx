export const PipelineCard = ({ step, title, icon: Icon, text }) => (
  <div className="p-10 bg-[#1A1F3A] border border-cyan-500/15 rounded-2xl relative group hover:-translate-y-2 transition-all duration-300">
    <div className="absolute -top-5 left-10 w-10 h-10 bg-[#00D9FF] text-[#0A0E27] rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(0,217,255,0.4)]">
      {step}
    </div>
    <div className="text-[#00D9FF] mb-6 w-12 h-12">
      <Icon size={40} />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{text}</p>
  </div>
);
