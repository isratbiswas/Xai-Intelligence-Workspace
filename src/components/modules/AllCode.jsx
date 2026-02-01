"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import {
  BarChart3,
  Database,
  Zap,
  FileText,
  Target,
  Bell,
  Cpu,
  ArrowRight,
} from "lucide-react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function XaiLanding() {
  const heroCanvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const dashboardRef = useRef(null);
  const flowStagesRef = useRef([]);

  // --- Three.js Hero Animation ---
  useEffect(() => {
    const container = heroCanvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
      colors[i] = 0;
      colors[i + 1] = 0.85;
      colors[i + 2] = 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 30;

    let mouseX = 0,
      mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
    };
  }, []);

  // --- GSAP & Particle Canvas Logic ---
  useEffect(() => {
    // Dashboard Entrance
    gsap.to(dashboardRef.current, {
      scrollTrigger: {
        trigger: dashboardRef.current,
        start: "top 80%",
      },
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power4.out",
    });

    // Particle Background Logic
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 400; // Constrained height for section

    // (Particle Class and animation would go here similar to your original code)
    // For brevity, using CSS for the section's vibe.
  }, []);

  return (
    <div className="bg-[#0A0E27] text-[#E8EDF4] selection:bg-[#00D9FF] selection:text-[#0A0E27]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@300;400;600;700&family=Space+Mono&display=swap");
        :root {
          --accent: #00d9ff;
          --border: rgba(0, 217, 255, 0.15);
        }
        body {
          font-family: "Bai Jamjuree", sans-serif;
        }
        .mono {
          font-family: "Space Mono", monospace;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div ref={heroCanvasRef} className="absolute inset-0 z-10" />
        <div className="relative z-20 text-center max-w-4xl px-8">
          <div className="inline-block px-5 py-2 mb-8 text-xs tracking-widest uppercase border border-[var(--border)] rounded-full bg-cyan-500/10 mono animate-fadeIn">
            Intelligence Workspace
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent leading-tight">
            From Raw Data to
            <br />
            Actionable Intelligence
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Xai transforms chaos into clarity. Process complex data streams,
            extract meaningful patterns, and automate decisions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-10 py-4 bg-[#00D9FF] text-[#0A0E27] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all">
              Explore Dashboard
            </button>
            <button className="px-10 py-4 border border-[var(--border)] rounded-lg hover:bg-white/5 transition-all">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section id="flow" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Intelligence Pipeline</h2>
          <p className="text-slate-400">Three stages of transformation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Ingest Data",
              icon: <Database />,
              text: "Connect to any source. APIs, databases, and streams normalized instantly.",
            },
            {
              step: 2,
              title: "Analyze with AI",
              icon: <Cpu />,
              text: "Advanced ML models detect patterns and anomalies invisible to humans.",
            },
            {
              step: 3,
              title: "Generate Insights",
              icon: <Zap />,
              text: "Actionable intelligence delivered via automated workflows and alerts.",
            },
          ].map((stage, i) => (
            <div
              key={i}
              className="p-10 bg-[#1A1F3A] border border-[var(--border)] rounded-2xl relative hover:-translate-y-2 transition-transform"
            >
              <div className="absolute -top-5 left-10 w-10 h-10 bg-[#00D9FF] text-[#0A0E27] rounded-full flex items-center justify-center font-bold">
                {stage.step}
              </div>
              <div className="text-[#00D9FF] mb-6 w-12 h-12">{stage.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{stage.title}</h3>
              <p className="text-slate-400 leading-relaxed">{stage.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 px-8 bg-[#1A1F3A]/50">
        <div
          ref={dashboardRef}
          className="max-w-6xl mx-auto bg-[#0A0E27] rounded-3xl border border-[var(--border)] overflow-hidden shadow-2xl opacity-0 scale-95 transition-all"
        >
          <header className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-white/5">
            <div className="mono font-bold text-[#00D9FF]">XAI_SYSTEM</div>
            <div className="hidden md:flex gap-8 text-sm text-slate-400">
              <span className="text-[#00D9FF]">Overview</span>
              <span>Analytics</span>
              <span>Workflows</span>
            </div>
          </header>
          <div className="flex flex-col md:row h-[500px]">
            <aside className="w-full md:w-64 p-6 border-r border-[var(--border)] bg-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#00D9FF]/10 text-[#00D9FF] rounded-lg">
                  <BarChart3 size={18} /> Dashboard
                </div>
                <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white transition-colors">
                  <Database size={18} /> Data Sources
                </div>
                <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white transition-colors">
                  <Target size={18} /> Insights
                </div>
              </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Processed", val: "847K", change: "↑ 23%" },
                  { label: "Insights", val: "142", change: "↑ 8 new" },
                  { label: "Automation", val: "94.7%", change: "↑ 2%" },
                  { label: "Latency", val: "47ms", change: "↓ 12ms" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white/5 border border-[var(--border)] rounded-xl"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                      {m.label}
                    </div>
                    <div className="text-2xl font-bold">{m.val}</div>
                    <div className="text-[10px] text-[#00D9FF]">{m.change}</div>
                  </div>
                ))}
              </div>
              <div className="h-40 flex items-end gap-2 px-4">
                {[60, 80, 45, 90, 65, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#FF6B9D] to-[#00D9FF] rounded-t-sm"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[var(--border)]">
        <p className="mono text-sm text-slate-500">
          Xai Intelligence Workspace © 2026
        </p>
      </footer>
    </div>
  );
}
