import { Bai_Jamjuree, Space_Mono } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata = {
  title: "Xai - intelligence Workspace",
  description:
    "Xai Intelligence Workspace is a unified AI-powered platform that transforms raw data into structured intelligence and actionable insights. It enables teams to analyze, automate, and make confident decisions through a clean, interactive, and high-performance experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${baiJamjuree.variable}
          ${spaceMono.variable}
        
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
