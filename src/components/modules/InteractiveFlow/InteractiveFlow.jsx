"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const flowData = [
  {
    id: "1",
    title: "Ingest Data",
    desc: "Connect to any source. APIs, databases, files, streams—Xai normalizes disparate formats into a unified intelligence layer.",
    features: [
      "Real-time streaming ingestion",
      "Multi-format compatibility",
      "Automated data validation",
      "Zero-config connectors",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    ),
  },
  {
    id: "2",
    title: "Analyze with AI",
    desc: "Advanced ML models decode hidden correlations and predict market shifts invisible to traditional analytics.",
    features: [
      "Pattern recognition engine",
      "Predictive analytics",
      "Anomaly detection",
      "Natural language queries",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
  },
  {
    id: "3",
    title: "Generate Insights",
    desc: "Actionable intelligence delivered in context. Automated alerts, recommendations, and executable workflows.",
    features: [
      "Contextual recommendations",
      "Automated reporting",
      "Smart alerts & triggers",
      "API-first automation",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function InteractiveFlow() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".flow-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".connect-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 2,
        ease: "power2.inOut",
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
      className="relative py-24 md:py-32 bg-[#0A0E27] overflow-hidden transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px] opacity-20 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #22d3ee, transparent 70%)`,
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Intelligence <span className="text-cyan-400">Pipeline</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three stages that transform raw information into strategic advantage
          </p>
        </div>

        <div className="hidden lg:block absolute top-[55%] left-[15%] right-[15%] h-[1px] bg-slate-800 z-0">
          <div className="connect-line h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 relative z-10">
          {flowData.map((item) => (
            <div key={item.id} className="flow-card group relative">
              <div className="relative bg-[#0f172a]/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-cyan-400 text-black font-bold rounded-full flex items-center justify-center text-sm shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                  {item.id}
                </div>

                <div className="w-16 h-16 rounded-full border border-slate-700 flex items-center justify-center mb-8 mt-4 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-500">
                  <span className="text-cyan-400">{item.icon}</span>
                </div>

                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-50 transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-8 min-h-[80px]">
                  {item.desc}
                </p>

                <div className="space-y-4 border-t border-slate-800/50 pt-8">
                  {item.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs md:text-sm text-gray-400 group-hover:text-gray-200 transition-colors"
                    >
                      <span className="text-cyan-500">→</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
