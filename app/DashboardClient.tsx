"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../components/Sidebar";
import { HeroTile } from "../components/HeroTile";
import { CourseCard } from "../components/CourseCard";
import { ActivityTile } from "../components/ActivityTile";
import { AddCourseTile } from "../components/AddCourseTile";
import { Course, SidebarTab } from "../types";
import {
  Sparkles,
  CloudLightning,
  RefreshCw
} from "lucide-react";
import {
  updateCourseProgress,
  deleteCourse,
  addCourse,
  seedDefaultCourses
} from "./actions";

interface DashboardClientProps {
  initialCourses: Course[];
}

export default function DashboardClient({ initialCourses }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isSeeding, setIsSeeding] = useState(false);

  // Optimistic progress update
  const handleUpdateProgress = async (id: string, newProgress: number) => {
    const original = [...courses];
    setCourses(prev => prev.map(c => c.id === id ? { ...c, progress: newProgress } : c));

    const res = await updateCourseProgress(id, newProgress);
    if (!res.success) {
      setCourses(original); // revert
    }
  };

  // Optimistic deletion
  const handleDeleteCourse = async (id: string) => {
    const original = [...courses];
    setCourses(prev => prev.filter(c => c.id !== id));

    const res = await deleteCourse(id);
    if (!res.success) {
      setCourses(original); // revert
    }
  };

  // Safe course addition integration
  const handleAddCourse = async (title: string, progress: number, iconName: string): Promise<boolean> => {
    const res = await addCourse(title, progress, iconName);
    if (res.success && res.data) {
      setCourses(prev => [...prev, res.data as Course]);
      return true;
    }
    return false;
  };

  // Quick seed handler
  const handleQuickSeed = async () => {
    setIsSeeding(true);
    const res = await seedDefaultCourses();
    if (res.success) {
      // Re-fetch courses client-side after seeding is complete
      window.location.reload();
    }
    setIsSeeding(false);
  };

  const bentoContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const bentoItemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 320, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans overflow-x-hidden antialiased">
      {/* Dynamic top gradient ribbon */}
      <span className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 z-50 block" />

      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Column */}
      <main className={`flex-1 min-h-screen pb-24 md:pb-8 transition-all duration-300 ${isSidebarCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                variants={bentoContainerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* HERO GRID ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <motion.div variants={bentoItemVariants} className="lg:col-span-2">
                    <HeroTile />
                  </motion.div>
                   
                </div>

                {/* CENTRAL COMPLEX BENTO GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Courses tiles section */}
                  <motion.div variants={bentoItemVariants} className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <h2 className="font-sans font-bold text-zinc-100 text-lg flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-violet-400" />
                            Active Courses
                        </h2>
                        <p className="font-sans text-xs text-zinc-500">Your enrolled courses, synced live from the database</p>
                      </div>

                      <button
                        onClick={handleQuickSeed}
                        disabled={isSeeding}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer text-[10px]"
                        title="Seeding database with challenge rows"
                      >
                        <RefreshCw className={`h-3 w-3 ${isSeeding ? "animate-spin" : ""}`} />
                        {isSeeding ? "Seeding..." : "Quick Seed"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {courses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onUpdateProgress={handleUpdateProgress}
                          onDelete={handleDeleteCourse}
                        />
                      ))}
                      <AddCourseTile onAddCourse={handleAddCourse} />
                    </div>
                  </motion.div>

                  {/* Activity tiles section */}
                  <motion.div variants={bentoItemVariants}>
                    <ActivityTile />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div
                key="all-courses"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="font-sans font-extrabold text-white text-2xl tracking-tight">Active Curriculum modules</h1>
                  <p className="font-sans text-xs text-zinc-400">Perform seamless, fast CRUD operations securely through Server Actions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onUpdateProgress={handleUpdateProgress}
                      onDelete={handleDeleteCourse}
                    />
                  ))}
                  <AddCourseTile onAddCourse={handleAddCourse} />
                </div>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                key="all-activity"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="font-sans font-extrabold text-white text-2xl tracking-tight">Focus & Activity Trends</h1>
                    <p className="font-sans text-xs text-zinc-400">Your learning activity over the past weeks.</p>
                  </div>
                  <ActivityTile />
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer branding details */}
          <footer className="mt-16 pt-8 border-t border-white/5 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
            <p className="font-sans">© 2026 Next-Gen Learning Dashboard — Frontend Intern Challenge Submission</p>
            <div className="flex gap-4 font-mono text-[10px] text-violet-400/80">
              <span>Next.js 14 · Supabase · Framer Motion</span>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
