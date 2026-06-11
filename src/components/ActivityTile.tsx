"use client";

import { useStore } from "@/store/useStore";
import { AnimatedTile } from "./AnimatedTile";

export function ActivityTile({ delay = 0 }: { delay?: number }) {
  const { userActivity } = useStore();
  
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const dateStr = d.toISOString().split('T')[0];
    
    const activity = userActivity.find(a => a.activity_date === dateStr);
    
    return {
      id: i,
      date: dateStr,
      level: activity ? activity.level : 0,
    };
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-neutral-800";
      case 1: return "bg-indigo-900/50";
      case 2: return "bg-indigo-500/50";
      case 3: return "bg-indigo-400";
      default: return "bg-neutral-800";
    }
  };

  return (
    <AnimatedTile delay={delay} className="col-span-1 md:col-span-2 lg:col-span-1 p-6 bg-neutral-900/80">
      <h3 className="font-semibold text-white text-lg mb-6">Activity</h3>
      
      <div className="flex flex-col h-full justify-between pb-2">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div 
              key={day.id} 
              title={day.date}
              className={`w-full aspect-square rounded-sm ${getLevelColor(day.level)}`}
            />
          ))}
        </div>
        
        <div className="mt-6 flex justify-between items-center text-xs text-neutral-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-neutral-800" />
            <div className="w-3 h-3 rounded-sm bg-indigo-900/50" />
            <div className="w-3 h-3 rounded-sm bg-indigo-500/50" />
            <div className="w-3 h-3 rounded-sm bg-indigo-400" />
          </div>
          <span>More</span>
        </div>
      </div>
    </AnimatedTile>
  );
}
