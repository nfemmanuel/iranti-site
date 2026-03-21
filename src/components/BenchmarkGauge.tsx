"use client";

import { useEffect, useRef, useState } from "react";

interface GaugeProps {
  value: number;
  total: number;
  label: string;
  sub: string;
  status?: "pass" | "partial";
  size?: number;
}

function Gauge({ value, total, label, sub, status = "pass", size = 120 }: GaugeProps) {
  const ref = useRef<SVGCircleElement>(null);
  const [animated, setAnimated] = useState(false);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = value / total;
  const offset = circumference * (1 - pct);
  const color = status === "pass" ? "#2dd4bf" : "#f59e0b";
  const trackColor = status === "pass" ? "rgba(45,212,191,0.1)" : "rgba(245,158,11,0.1)";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            ref={ref}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)" }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-semibold leading-none"
            style={{ color, fontSize: size * 0.18 }}
          >
            {value}/{total}
          </span>
          <span
            className="font-mono mt-0.5"
            style={{ color: "var(--text-faint)", fontSize: size * 0.09 }}
          >
            {status === "pass" ? "PASS" : "PARTIAL"}
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-[var(--text-code)]">{label}</div>
        <div className="text-xs text-[var(--text-faint)] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

interface BarProps {
  label: string;
  score: string;
  note: string;
  delay?: number;
}

function ConflictBar({ label, score, note, delay = 0 }: BarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [num, denom] = score.split("/").map(Number);
  const pct = (num / denom) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setAnimated(true), delay); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-code)]">{label}</span>
        <span className="font-mono text-sm text-teal-400">{score}</span>
      </div>
      <div className="h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full"
          style={{
            width: animated ? `${pct}%` : "0%",
            transition: `width 0.9s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
          }}
        />
      </div>
      <p className="text-xs text-[var(--text-faint)]">{note}</p>
    </div>
  );
}

export { Gauge, ConflictBar };
