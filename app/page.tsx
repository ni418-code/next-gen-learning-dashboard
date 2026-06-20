import React from "react";
import { getCourses } from "./actions";
import DashboardClient from "./DashboardClient";

// Forces dynamic rendering so data is fetched live from Supabase at runtime
export const dynamic = "force-dynamic";

export default async function Page() {
  const initialCourses = await getCourses();
  
  return <DashboardClient initialCourses={initialCourses} />;
}
