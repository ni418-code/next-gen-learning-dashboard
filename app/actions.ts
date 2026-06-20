"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { Course } from "../types";

// Server-side initialization (safely hidden from client bundles)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
});

export async function getCourses(): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase fetch failed, returning static fallback:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("Error connecting to Supabase database:", err);
    return [];
  }
}

export async function addCourse(title: string, progress: number, iconName: string) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .insert([{ title, progress, icon_name: iconName }])
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath("/");
    return { success: true, data };
  } catch (err: any) {
    console.error("Failed to add course record:", err.message || err);
    return { success: false, error: err.message || err };
  }
}

export async function updateCourseProgress(id: string, newProgress: number) {
  try {
    const { error } = await supabase
      .from("courses")
      .update({ progress: newProgress })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to update course progress:", err.message || err);
    return { success: false, error: err.message || err };
  }
}

export async function deleteCourse(id: string) {
  try {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete course record:", err.message || err);
    return { success: false, error: err.message || err };
  }
}

export async function seedDefaultCourses() {
  const sampleCourses = [
    { title: "Advanced React Patterns", progress: 75, icon_name: "Atom" },
    { title: "Next.js Hydration & SSR", progress: 90, icon_name: "Workflow" },
    { title: "Tailwind GPU Acceleration", progress: 45, icon_name: "Layers" },
    { title: "PostgreSQL Schema Mechanics", progress: 60, icon_name: "Database" }
  ];

  try {
    // Delete existing rows
    await supabase.from("courses").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Insert sample rows
    const { error } = await supabase.from("courses").insert(sampleCourses);
    if (error) throw error;

    revalidatePath("/");
    return { success: true, message: "Successfully seeded default courses!" };
  } catch (err: any) {
    console.error("Failed to seed default database rows:", err.message || err);
    return { success: false, error: err.message || err };
  }
}
