"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const flowData = [
  {
    id: "01",
    title: "Data Ingestion",
    desc: "Seamlessly aggregate fragmented data into a high-velocity intelligence stream.",
    features: [
      "Real-time API Polling",
      "Cloud Database Sync",
      "Edge Computing Support",
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "02",
    title: "Neural Analysis",
    desc: "Proprietary ML models decode hidden correlations and predict market shifts.",
    features: [
      "Pattern Recognition",
      "Sentiment Analysis",
      "Predictive Modeling",
    ],
    color: "from-purple-500 to-cyan-500",
  },
  {
    id: "03",
    title: "Actionable Output",
    desc: "Autonomous workflows execute decisions before the competition even blinks.",
    features: ["Smart Webhooks", "Automated Reporting", "Dynamic Alerts"],
    color: "from-cyan-400 to-emerald-400",
  },
];

export default function InteractiveFlow() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".flow-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".connect-line", {
        width: 0,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative py-32 bg-[#0A0E27] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute top-1/2 left-1/2 w-[800px] h-[400px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.5), transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.4em] text-cyan-400 font-bold mb-4">
            The Process
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Intelligence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Pipeline
            </span>
          </h3>
        </div>

        <div className="hidden lg:block absolute top-[60%] left-[10%] right-[10%] h-[2px] bg-white/5 z-0">
          <div className="connect-line h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
          {flowData.map((item) => (
            <div key={item.id} className="flow-card group relative">
              <div className="relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 group-hover:from-cyan-400/40">
                <div
                  className="bg-[#0A0F29]/60 backdrop-blur-[20px] p-8 rounded-[1.9rem] h-full transition-transform duration-500 group-hover:scale-[0.98] border-2 border-transparent hover:border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  style={{
                    boxShadow: `0 0 30px 5px rgba(34,211,238,0.3),
                                0 0 60px 10px rgba(34,211,238,0.2)`,
                  }}
                >
                  <span
                    className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-black text-5xl mb-6 opacity-50`}
                  >
                    {item.id}
                  </span>

                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
                    {item.desc}
                  </p>

                  <div className="space-y-3">
                    {item.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-xs md:text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
