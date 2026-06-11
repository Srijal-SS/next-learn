"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, BookOpen, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useStore } from "@/store/useStore";


const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchUser, setUser } = useStore();
  const supabase = createClient();

  useEffect(() => {
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [fetchUser, setUser]);

  return (
    <nav
      className={cn(
        "flex flex-col justify-between py-6 px-4 bg-neutral-950/50 border-r border-neutral-800 transition-all duration-300 backdrop-blur-md h-full z-20",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">NL</span>
          </div>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-neutral-100 font-semibold tracking-wide whitespace-nowrap overflow-hidden"
            >
              Next Learn
            </motion.span>
          )}
        </div>

        <ul className="flex flex-col gap-2 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

            return (
              <li key={item.name} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-neutral-800/80 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                    isActive ? "text-indigo-400" : "text-neutral-400 hover:text-neutral-200"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0 relative z-10" />
                  {isExpanded && (
                    <span className="whitespace-nowrap overflow-hidden text-sm font-medium relative z-10">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
