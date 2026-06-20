import React from "react";
import "./globals.css";

export const metadata = {
  title: "Next-Gen Learner Student Dashboard Prototype",
  description: "A premium, dynamic Bento Grid dashboard using Next.js Server Components and Framer Motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
