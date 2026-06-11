"use client";

import { LayoutDashboard, BookOpen, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-950/2 border-t border-neutral-800 backdrop-blur-md z-40 pb-safe">
      <ul className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

          return (
            <li key={item.name} className="relative flex-1">
              <Link
                href={item.href}
                className="w-full flex flex-col items-center justify-center gap-1"
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative p-1">
                  {isActive && (
                    <motion.div
                      layoutId="active-bottom-nav"
                      className="absolute inset-[-4px] bg-neutral-800/80 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  <Icon 
                    className={clsx(
                      "w-6 h-6 relative z-10 transition-colors",
                      isActive ? "text-indigo-400" : "text-neutral-400"
                    )} 
                  />
                </div>
                <span className={clsx(
                  "text-[10px] font-medium transition-colors relative z-10",
                  isActive ? "text-indigo-400" : "text-neutral-400"
                )}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
