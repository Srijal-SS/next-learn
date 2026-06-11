"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function Progress({
  value = 0,
  className,
}: { value?: number; className?: string }) {
  return (
    <div
      data-slot="progress"
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-neutral-800", className)}
    >
      <motion.div
        className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.3 }}
      />
    </div>
  )
}

export { Progress }
