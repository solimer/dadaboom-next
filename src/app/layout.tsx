"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

import "@/src/styles/tailwind.scss";
import { montserrat, openSans } from "@/src/styles/fontLoad";

import cn from "../lib/utils/cn";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          openSans.variable,
          montserrat.variable
        )}
      >
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
