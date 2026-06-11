"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  },
};

interface AnimatedTileProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedTile({ children, className, delay = 0 }: AnimatedTileProps) {
  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={cn(
        "relative rounded-3xl bg-neutral-900 border border-neutral-800/50 overflow-hidden group",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      
      {children}
    </motion.article>
  );
}
