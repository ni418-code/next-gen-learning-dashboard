"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Course } from "../types";
import { DynamicIcon } from "./DynamicIcon";
import { Trash2 } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onUpdateProgress: (id: string, newProgress: number) => void;
  onDelete: (id: string) => void;
}

export function CourseCard({ course, onUpdateProgress, onDelete }: CourseCardProps) {
  const [editVal, setEditVal] = useState(course.progress);

  useEffect(() => {
    setEditVal(course.progress);
  }, [course.progress]);

  const handleIncrement = () => {
    const nextVal = Math.min(100, editVal + 5);
    setEditVal(nextVal);
    onUpdateProgress(course.id, nextVal);
  };

  const handleDecrement = () => {
    const prevVal = Math.max(0, editVal - 5);
    setEditVal(prevVal);
    onUpdateProgress(course.id, prevVal);
  };

  return (
    <motion.article
      id={`course-card-${course.id}`}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 p-6 backdrop-blur-xl transition-shadow duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 group"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Abstract Gradient Mesh Background to avoid shift */}
      <span className="pointer-events-none absolute inset-0 z-0 select-none block">
        <span className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:from-violet-500/15" />
        <span className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-gradient-to-tr from-cyan-500/5 to-transparent blur-2xl transition-opacity duration-300 group-hover:from-cyan-500/10" />
        <span 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" 
          aria-hidden="true"
        />
      </span>

      {/* Decorative border highlight */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main layout */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 border border-white/5 text-violet-400 group-hover:text-violet-300 group-hover:border-violet-500/20 transition-all duration-300 shadow-inner">
            <DynamicIcon name={course.icon_name} className="h-6 w-6" />
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleDecrement}
              className="p-1 px-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-white/5 text-xs font-mono transition-colors"
              title="Decrease Progress (-5%)"
            >
              -
            </button>
            <button
              onClick={handleIncrement}
              className="p-1 px-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-white/5 text-xs font-mono transition-colors"
              title="Increase Progress (+5%)"
            >
              +
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="p-1 rounded bg-zinc-800/80 hover:bg-red-950 hover:text-red-400 text-zinc-400 border border-white/5 hover:border-red-500/20 transition-colors"
              title="Delete Course Table Record"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-sans font-semibold text-zinc-100 text-base leading-snug tracking-tight mb-1 group-hover:text-white transition-colors">
            {course.title}
          </h3>
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-violet-400 animate-ping" />
            Active Module
          </p>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs text-zinc-400">Course Progress</span>
            <span className="font-mono text-sm font-semibold text-violet-400">{course.progress}%</span>
          </div>

          {/* Animated Custom Progress Bar */}
          <div className="relative h-2 w-full rounded-full bg-zinc-800/80 overflow-hidden border border-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
