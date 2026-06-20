"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

export function ActivityTile() {
  const [hoveredDay, setHoveredDay] = useState<{ week: number; day: number; hours: number } | null>(null);

  const columns = 16;
  const rows = 7;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDensityHours = (col: number, row: number) => {
    const combinedSeed = (col * 3 + row * 7) % 11;
    if (combinedSeed === 0) return 0;
    if (combinedSeed < 3) return 1.5;
    if (combinedSeed < 6) return 4.2;
    if (combinedSeed < 9) return 6.8;
    return 9.5;
  };

  const getCellColor = (hours: number) => {
    if (hours === 0) return "bg-zinc-800/40 hover:bg-zinc-800/90";
    if (hours < 3) return "bg-violet-950 text-violet-400 hover:bg-violet-900";
    if (hours < 6) return "bg-violet-800 text-violet-300 hover:bg-violet-700";
    if (hours < 9) return "bg-violet-600 text-purple-100 hover:bg-violet-500";
    return "bg-cyan-400 text-zinc-950 hover:bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.2)]";
  };

  return (
    <div
      id="activity-bento-tile"
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 p-6 backdrop-blur-xl group hover:border-violet-500/20 hover:shadow-[0_0_24px_rgba(139,92,246,0.03)] transition-all duration-300 flex flex-col h-full justify-between"
    >
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/10 text-violet-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-sans font-semibold text-zinc-100 text-base">Focus Activity</h2>
              <p className="font-sans text-xs text-zinc-500 font-normal">Daily learning activity</p>
            </div>
          </div>

          <div className="font-mono text-[10px] text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-white/5 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
            142 Total Hours
          </div>
        </div>

        {/* Matrix Box Grid */}
        <div className="flex gap-2 justify-center py-4 bg-zinc-950/20 rounded-xl border border-white/[0.02] p-4 mb-4">
          <div className="flex flex-col justify-between text-[9px] font-mono text-zinc-600 pr-1 select-none">
            {dayNames.map((d, idx) => (
              <span key={idx} className={idx % 2 === 1 ? "opacity-100" : "opacity-0"}>
                {d}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5 animate-fade-in">
                {Array.from({ length: rows }).map((_, rowIdx) => {
                  const hours = getDensityHours(colIdx, rowIdx);
                  return (
                    <motion.div
                      key={rowIdx}
                      className={`h-3.5 w-3.5 rounded-sm transition-all duration-150 cursor-pointer ${getCellColor(hours)}`}
                      whileHover={{ scale: 1.3, zIndex: 20 }}
                      transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      onMouseEnter={() => setHoveredDay({ week: colIdx + 1, day: rowIdx, hours })}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="h-6 flex items-center justify-center font-mono text-xs mb-4">
          {hoveredDay ? (
            <motion.p 
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-zinc-300"
            >
              Week {hoveredDay.week}, {dayNames[hoveredDay.day]}: <strong className="text-violet-400">{hoveredDay.hours} hours</strong> focus.
            </motion.p>
          ) : (
            <p className="text-zinc-500 text-[11px] uppercase tracking-wide">Hover over a cell to see hours</p>
          )}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/5 text-center">
        <div className="bg-zinc-850/40 p-2.5 rounded-xl border border-white/[0.02]">
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-0.5">Average</div>
          <div className="font-mono font-semibold text-xs text-zinc-200">2.4h/d</div>
        </div>
        <div className="bg-zinc-850/40 p-2.5 rounded-xl border border-white/[0.02]">
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-0.5">Success</div>
          <div className="font-mono font-semibold text-xs text-cyan-400">92%</div>
        </div>
        <div className="bg-zinc-850/40 p-2.5 rounded-xl border border-white/[0.02]">
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-0.5">Weekly</div>
          <div className="font-mono font-semibold text-xs text-violet-400">+12%</div>
        </div>
      </div>
    </div>
  );
}
