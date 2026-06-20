"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Flame, Play } from "lucide-react";

export function HeroTile() {
  const [userName, setUserName] = useState("Nirupa");
  const [streak, setStreak] = useState(12);

  return (
    <section
      id="welcome-greeting-hero"
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 p-6 md:p-8 backdrop-blur-xl group hover:border-violet-500/10 hover:shadow-[0_0_24px_rgba(139,92,246,0.02)] transition-all duration-300 flex flex-col justify-between h-full min-h-[190px]"
    >
      {/* Absolute floating gradient glow */}
      <span className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-violet-600/10 to-transparent blur-3xl" />
      <span className="pointer-events-none absolute right-10 bottom-0 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-violet-400 font-semibold mb-1">
             Student Dashboard
          </p>
          <div className="flex items-center gap-2">
            <h1 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-white mb-2">
              Welcome back, <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent hover:brightness-110 transition-all">{userName}</span>
            </h1>
          </div>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-md">
            You have 4 active courses and a 12-day learning streak. Keep it up!
          </p>
        </div>

        {/* Learning Streak Indicators */}
        <div className="flex items-center gap-3 bg-zinc-950/60 p-4 rounded-2xl border border-white/5 shadow-inner">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 animate-bounce-slow">
            <Flame className="h-5 w-5 fill-orange-500" />
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">Streak Ratio</div>
            <div className="font-sans text-base font-bold text-zinc-200">
              {streak} <span className="text-zinc-500 text-xs font-normal">Active Days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
