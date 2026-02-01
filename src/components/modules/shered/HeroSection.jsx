"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroHeader() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerRef.current.appendChild(renderer.domElement);

    const particleCount = 1500;
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

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0E27]">
      <div ref={containerRef} className="absolute inset-0 z-[1]" />

      <div className="relative z-[2] text-center max-w-4xl px-6">
        <span className="inline-block mb-6 px-5 py-2 text-xs tracking-widest uppercase border border-cyan-400/20 bg-cyan-400/10 rounded-full text-cyan-300">
          Intelligence Workspace
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-6">
          From Raw Data to <br /> Actionable Intelligence
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
          Xai transforms chaos into clarity. Process complex data streams,
          extract meaningful patterns, and automate decisions with confidence.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#dashboard"
            className="bg-cyan-400 text-[#0A0E27] px-8 py-3 rounded-lg font-semibold hover:-translate-y-1 transition"
          >
            Explore Dashboard
          </a>

          <a
            href="#flow"
            className="border border-cyan-400/20 px-8 py-3 rounded-lg text-white hover:bg-cyan-400/10 hover:-translate-y-1 transition"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
