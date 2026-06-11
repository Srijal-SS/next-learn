import { HeroTile } from "@/components/HeroTile";
import { ActivityTile } from "@/components/ActivityTile";
import { UserCoursesList } from "@/components/UserCoursesList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full h-full pb-20 md:pb-0">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HeroTile delay={0} />
        <ActivityTile delay={0.12} />
        
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-between mt-4">
          <h2 className="text-xl font-semibold text-white">Recent Courses</h2>
          <Link href="/courses" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <UserCoursesList />
      </section>
    </div>
  );
}
