"use client";

import React, { useState } from "react";
import { Plus, Check, AlertCircle } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";

interface AddCourseTileProps {
  onAddCourse: (title: string, progress: number, iconName: string) => Promise<boolean>;
}

export function AddCourseTile({ onAddCourse }: AddCourseTileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(50);
  const [iconName, setIconName] = useState("Atom");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const availableIcons = ["Atom", "BookOpen", "Database", "Layers", "Workflow", "Gamepad", "Cpu", "Code"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrMsg("Please provide a valid module course title.");
      return;
    }
    setErrMsg(null);
    setIsSubmitting(true);
    
    const success = await onAddCourse(title.trim(), Number(progress), iconName);
    setIsSubmitting(false);
    
    if (success) {
      setTitle("");
      setProgress(50);
      setIconName("Atom");
      setIsOpen(false);
    } else {
      setErrMsg("Transaction abort: database write failed.");
    }
  };

  return (
    <article className="rounded-2xl border border-dashed border-white/10 bg-zinc-950/20 p-6 flex flex-col justify-center items-center min-h-[190px] relative transition-colors duration-300 hover:border-violet-500/20 scroll-mt-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-2 cursor-pointer group text-zinc-500 hover:text-zinc-300 select-none transition-all"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/10 group-hover:scale-105 transition-all duration-300">
            <Plus className="h-5 w-5" />
          </span>
          <span className="font-sans font-semibold text-xs tracking-wide">Add Course Module</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="w-full space-y-3.5 text-xs animate-fade-in text-left">
          <div className="flex justify-between items-center pb-1 border-b border-white/[0.04]">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">New Curriculum Row</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="font-mono text-[9px] text-zinc-500 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-zinc-500 mb-1 font-sans">Course Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Hydration Masterclass"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-1.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500/30 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-500 mb-1 font-sans">Initial%</label>
              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-violet-500/30 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-sans">Module Icon</label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-lg px-2 py-1.5 text-zinc-100 focus:outline-none focus:border-violet-500/30 text-xs"
              >
                {availableIcons.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errMsg && (
            <div className="text-[10px] text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-8 flex justify-center items-center gap-1.5 bg-gradient-to-r from-violet-500 to-cyan-400 text-zinc-950 font-semibold rounded-lg font-sans text-xs hover:from-violet-400 hover:to-cyan-300 transition-all cursor-pointer shadow-sm"
          >
            {isSubmitting ? "Syncing..." : "Commit Table Row"}
          </button>
        </form>
      )}
    </article>
  );
}
