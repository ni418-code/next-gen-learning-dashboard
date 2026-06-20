import React from "react";

export function CourseSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-6 space-y-4 animate-pulse">
      <div className="h-12 w-12 rounded-xl bg-zinc-800" />
      <div className="space-y-2">
        <div className="h-4 w-2/3 bg-zinc-850 rounded" />
        <div className="h-3 w-1/3 bg-zinc-850 rounded" />
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
      </div>
    </div>
  );
}
