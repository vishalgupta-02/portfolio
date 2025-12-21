// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       aria-label="Toggle theme"
//       className="cursor-pointer"
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//       <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   );
// }

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [animating, setAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check if user prefers reduced motion
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Listen for changes to motion preference
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (animating || prefersReducedMotion) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    setAnimating(true);

    const { clientX, clientY } = event;

    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[9999] pointer-events-none bg-white dark:bg-zinc-950 transition-[clip-path] duration-700 ease-in-out";

    overlay.style.clipPath = `circle(0px at ${clientX}px ${clientY}px)`;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(150% at ${clientX}px ${clientY}px)`;
    });

    // Switch theme halfway through the animation
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 350);

    setTimeout(() => {
      document.body.removeChild(overlay);
      setAnimating(false);
    }, 800);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative cursor-pointer overflow-hidden"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
