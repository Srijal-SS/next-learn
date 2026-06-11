"use client";

import { useStore } from "@/store/useStore";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<"my-courses" | "explore">("my-courses");
  const [searchQuery, setSearchQuery] = useState("");
  const { userCourses, allCourses, enrollInCourse, isLoadingUser } = useStore();

  const enrolledCourseIds = new Set(userCourses.map((uc) => uc.course_id));
  const exploreCourses = allCourses.filter(
    (c) => !enrolledCourseIds.has(c.id) && c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredMyCourses = userCourses.filter((uc) =>
    uc.courses.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-neutral-400 text-sm">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link
          href="/"
          className="mt-1 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">Courses</h1>
          <p className="text-neutral-400 text-sm mt-1">Manage your learning journey</p>
        </div>


      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900/80 border border-neutral-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-1 bg-neutral-900/60 border border-neutral-800 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("my-courses")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer",
              activeTab === "my-courses"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            <BookOpen className="w-4 h-4" />
            My Courses
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full font-semibold",
              activeTab === "my-courses" ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
            )}>
              {userCourses.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer",
              activeTab === "explore"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            <Compass className="w-4 h-4" />
            Explore
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full font-semibold",
              activeTab === "explore" ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
            )}>
              {allCourses.length - userCourses.length}
            </span>
          </button>
        </div>

        {/* Content */}
        {activeTab === "my-courses" ? (
          filteredMyCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMyCourses.map((userCourse, index) => {
                const mappedCourse = {
                  id: userCourse.course_id,
                  title: userCourse.courses.title,
                  progress: userCourse.progress,
                  icon_name: userCourse.courses.icon_name,
                };
                return <CourseCard key={userCourse.id} course={mappedCourse} index={index} isEnrolled={true} />;
              })}
            </div>
          ) : (
            <EmptyState
              icon={<BookOpen className="w-10 h-10 text-neutral-600" />}
              title="No courses yet"
              description={searchQuery ? "No courses match your search." : "You haven't enrolled in any courses. Explore to get started!"}
              action={!searchQuery ? <Button onClick={() => setActiveTab("explore")} className="bg-indigo-600 hover:bg-indigo-500 rounded-xl">Browse Courses</Button> : undefined}
            />
          )
        ) : (
          exploreCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {exploreCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                  isEnrolled={false}
                  onEnroll={() => enrollInCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Compass className="w-10 h-10 text-neutral-600" />}
              title={searchQuery ? "No results" : "All caught up!"}
              description={searchQuery ? "No courses match your search." : "You've enrolled in every available course. Check back soon for more!"}
            />
          )
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon, title, description, action,
}: {
  icon: React.ReactNode; title: string; description: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral-300">{title}</h3>
        <p className="text-sm text-neutral-500 mt-1 max-w-xs">{description}</p>
      </div>
      {action}
    </div>
  );
}
