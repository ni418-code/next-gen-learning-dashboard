"use client";

import React from "react";
import { motion } from "framer-motion";
import { SidebarTab } from "../types";
import { 
  LayoutDashboard, 
  BookOpen, 
  LineChart, 
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ 
  activeTab, 
  onTabChange, 
  isCollapsed, 
  onToggleCollapse
}: SidebarProps) {
  
  const menuItems = [
    { id: "dashboard" as SidebarTab, label: "Dashboard", icon: LayoutDashboard },
    { id: "courses" as SidebarTab, label: "All Courses", icon: BookOpen },
    { id: "activity" as SidebarTab, label: "Activity Logs", icon: LineChart }
  ];

  return (
    <>
      {/* DESKTOP/TABLET SIDEBAR NAVIGATION: Slim & collapsible (Hidden below 768px) */}
      <aside
        className={`hidden md:flex flex-col h-screen fixed top-0 left-0 z-40 bg-zinc-950 border-r border-white/5 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-[0_0_12px_rgba(139,92,246,0.2)]">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-zinc-950 font-sans font-bold text-sm text-white">
                Ω
              </div>
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-sans font-extrabold text-sm tracking-widest text-zinc-100 uppercase"
              >
                EduDash
              </motion.span>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Collapse"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`relative w-full flex items-center gap-3.5 px-4 h-11 rounded-xl text-xs font-medium font-sans select-none cursor-pointer transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                {/* Snapping background highlight using Framer Motion's layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveHighlight"
                    className="absolute inset-0 bg-white/[0.04] border border-white/5 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center justify-center">
                  <Icon className={`h-4 w-4 ${isActive ? "text-violet-400" : "text-zinc-400"}`} />
                </span>

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10 font-sans tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info containing Collapse/Expand buttons */}
        <div className="p-4 border-t border-white/5 space-y-3">
          {isCollapsed ? (
            <button
              onClick={onToggleCollapse}
              className="w-full flex items-center justify-center h-10 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white border border-white/5 cursor-pointer"
              title="Expand Sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/5 text-center space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse" />
                <span className="font-mono text-[9px] uppercase text-zinc-400 font-semibold tracking-wider">
                  Supabase Live
                </span>
              </div>
              <p className="font-sans text-[10px] text-zinc-500 leading-tight">
                Database connected
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR: Sticky on small mobile layouts (Visible below 768px) */}
      <nav
        id="mobile-navigation-bar"
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-950/90 backdrop-blur-md border-t border-white/5 z-40 flex items-center justify-around px-4 pb-safe"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl text-[10px] font-medium font-sans cursor-pointer transition-colors ${isActive ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveHighlight"
                  className="absolute -top-2 h-[2px] w-8 bg-violet-400"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
