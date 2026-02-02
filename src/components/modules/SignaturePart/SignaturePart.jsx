"use client";

import { useEffect, useRef } from "react";

export default function SignatureSection() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.life = 1;
      }
      update(mouseX, mouseY) {
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
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${this.life * 0.6})`;
        ctx.fill();
      }
    }

    particles.current = Array.from({ length: 150 }, () => new Particle());

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", setCanvasSize);

    const animate = () => {
      ctx.fillStyle = "rgba(10, 14, 39, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        p.update(mouse.current.x, mouse.current.y);
        p.draw();
      });

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 217, 255, ${(1 - dist / 100) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="signature-section"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className="signature-content"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #00D9FF 0%, #FF6B9D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Intelligence in Motion
        </h2>
        <p
          style={{
            fontSize: "clamp(1rem, 4vw, 1.3rem)",
            color: "#8B92A8",
            marginBottom: "2.5rem",
            lineHeight: "1.6",
          }}
        >
          Experience how data flows through our neural processing system. Move
          your cursor to interact with the particle field.
        </p>
        <a
          href="#"
          className="bg-cyan-500 hover:bg-cyan-400 transition-colors duration-300 text-white"
          style={{
            padding: "1rem 2.5rem",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "1.1rem",
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          Start Your Journey
        </a>
      </div>
    </section>
  );
}
