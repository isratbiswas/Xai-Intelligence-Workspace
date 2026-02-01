"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.life = 1;
  }

  update(mouseX, mouseY, width, height) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.vx -= (dx / dist) * force * 0.5;
      this.vy -= (dy / dist) * force * 0.5;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.vy *= 0.99;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 217, 255, ${this.life * 0.6})`;
    ctx.fill();
  }
}

export default function SignaturePart() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };
    };

    resizeCanvas();

    // Create particles
    particlesRef.current = [];
    for (let i = 0; i < 150; i++) {
      particlesRef.current.push(new Particle(canvas.width, canvas.height));
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.fillStyle = "rgba(10, 14, 39, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Draw particles
      particles.forEach((particle) => {
        particle.update(
          mouseRef.current.x,
          mouseRef.current.y,
          canvas.width,
          canvas.height,
        );
        particle.draw(ctx);
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 217, 255, ${(1 - dist / 100) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-40 px-8 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-8 text-gradient-warm"
        >
          Intelligence in Motion
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl text-gray-400 mb-12"
        >
          Experience how data flows through our neural processing system. Move
          your cursor to interact with the particle field.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#"
            className="inline-block px-10 py-4 bg-accent text-primary font-semibold rounded-lg hover:shadow-[0_10px_40px_rgba(0,217,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
