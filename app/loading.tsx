import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans antialiased">
      {/* Sidebar Skeleton (Collapsible/Desktop) */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-zinc-950 border-r border-white/5 p-6 space-y-8 shrink-0">
        <div className="h-10 w-28 bg-zinc-900 rounded-lg animate-pulse" />
        <div className="space-y-4 flex-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-11 w-full bg-zinc-900 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-16 w-full bg-zinc-900 rounded-xl animate-pulse" />
      </aside>

      {/* Main Panel Content Skeleton */}
      <main className="flex-1 min-h-screen p-8 max-w-7xl mx-auto space-y-6">
        {/* Hero & Stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-48 bg-zinc-900/60 rounded-2xl border border-white/5 p-6 animate-pulse" />
          <div className="h-48 bg-zinc-900/60 rounded-2xl border border-white/5 p-6 animate-pulse" />
        </div>

        {/* Central Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses Frame */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 w-48 bg-zinc-900/80 rounded animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 bg-zinc-900/40 rounded-2xl border border-white/5 p-6 space-y-4 animate-pulse">
                  <div className="h-12 w-12 bg-zinc-800 rounded-xl" />
                  <div className="h-5 w-3/4 bg-zinc-800 rounded" />
                  <div className="space-y-2">
                    <div className="h-3 w-1/4 bg-zinc-800 rounded" />
                    <div className="h-2 w-full bg-zinc-800 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap Skeleton */}
          <div className="h-80 bg-zinc-900/60 rounded-2xl border border-white/5 p-6 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
