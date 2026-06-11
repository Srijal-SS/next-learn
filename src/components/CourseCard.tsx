import { Book, Code2, Sparkles, Database, Layout, type LucideIcon } from "lucide-react";
import { AnimatedTile } from "./AnimatedTile";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Sparkles,
  Database,
  Layout,
  Book,
};

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    progress: number;
    icon_name: string;
  };
  index: number;
  isEnrolled?: boolean;
  onEnroll?: () => void;
}

export function CourseCard({ course, index, isEnrolled = true, onEnroll }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] || Book;

  return (
    <AnimatedTile 
      className="p-6 flex flex-col justify-between min-h-[180px] bg-neutral-900/80 relative"
      delay={index * 0.1}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-4 border border-neutral-700">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="font-semibold text-white text-lg mb-1">{course.title}</h3>
      </div>

      <div className="mt-4 relative z-10">
        {isEnrolled ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-neutral-400 font-medium">Progress</span>
              <span className="text-xs text-neutral-300 font-semibold">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2 bg-neutral-800 rounded-full" />
          </>
        ) : (
          <Button
            onClick={onEnroll}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
          >
            Enroll Now
          </Button>
        )}
      </div>
    </AnimatedTile>
  );
}
