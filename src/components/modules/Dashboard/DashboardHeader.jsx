import React, { useState } from "react";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  const navItems = ["Overview", "Analytics", "Workflows", "Settings"];

  return (
    <header className="w-full bg-[#121730] backdrop-blur-md border-b border-cyan-300/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <div className="font-mono text-cyan-400 text-lg sm:text-xl md:text-2xl font-bold">
          XAI
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`relative text-sm font-medium transition-colors
                ${
                  idx === 0
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
            >
              {item}

              {idx === 0 && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#121730] border-t border-cyan-300/10">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`text-sm font-medium transition-colors
                  ${
                    idx === 0
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
