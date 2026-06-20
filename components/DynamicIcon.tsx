import React from "react";
import * as Icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  // Safe registry mapping
  const IconComponent = (Icons as any)[name] || Icons.BookOpen;
  return <IconComponent className={className} />;
}
