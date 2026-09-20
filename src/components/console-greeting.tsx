"use client";

import { useEffect } from "react";

export function ConsoleGreeting() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const banner = `
%c🚀 Vishal Gupta | Backend & Distributed Systems Engineer
%c• Core Focus: High-throughput architecture, multi-tenant databases, concurrency safety
• Linkforge SaaS: https://linkforge-web-iota.vercel.app/
• Contact: abhimanyug987@gmail.com
• System Status: 100% operational | Ready for high-impact roles
    `;

    console.log(
      banner,
      "color: #10b981; font-weight: 700; font-size: 13px; font-family: monospace; padding: 4px 0;",
      "color: #94a3b8; font-size: 11px; font-family: monospace; line-height: 1.6;"
    );
  }, []);

  return null;
}
