"use client";

import { useStore } from "@/store/useStore";
import { CourseCard } from "@/components/CourseCard";

export function UserCoursesList() {
  const { userCourses, isLoadingUser } = useStore();

  if (isLoadingUser) {
    return <div className="text-neutral-400">Loading courses...</div>;
  }

  if (userCourses.length === 0) {
    return <div className="text-neutral-400">You haven't enrolled in any courses yet.</div>;
  }

  return (
    <>
      {userCourses.map((userCourse, index) => {
        // Map the database format to what CourseCard expects
        const mappedCourse = {
          id: userCourse.course_id,
          title: userCourse.courses.title,
          progress: userCourse.progress,
          icon_name: userCourse.courses.icon_name,
        };
        
        return <CourseCard key={userCourse.id} course={mappedCourse} index={index + 2} />;
      })}
    </>
  );
}
