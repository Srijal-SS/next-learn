"use client";

import { Flame } from "lucide-react";
import { AnimatedTile } from "./AnimatedTile";
import { useStore } from "@/store/useStore";

export function HeroTile({ delay = 0 }: { delay?: number }) {
  const { user, profile } = useStore();
  return (
    <AnimatedTile delay={delay} className="col-span-1 md:col-span-2 lg:col-span-2 p-8 bg-linear-to-br from-indigo-900/40 to-neutral-900 flex flex-col justify-between min-h-50">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.user_metadata?.full_name}</h2>
        <p className="text-neutral-400">You're going to make great progress today.</p>
      </div>
      
      <div className="mt-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{profile?.streak || 0} Days</div>
          <div className="text-sm text-neutral-400">Current learning streak</div>
        </div>
      </div>
    </AnimatedTile>
  );
}
