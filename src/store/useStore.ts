import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { toast } from 'sonner'

export interface Profile {
  streak: number;
}

export interface UserActivity {
  id: string;
  activity_date: string;
  level: number;
}

export interface UserCourse {
  id: string;
  course_id: string;
  progress: number;
  courses: {
    title: string;
    icon_name: string;
  };
}

export interface Course {
  id: string;
  title: string;
  icon_name: string;
  progress: number;
}

interface AppState {
  user: User | null;
  profile: Profile | null;
  userActivity: UserActivity[];
  userCourses: UserCourse[];
  allCourses: Course[];
  isLoadingUser: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  profile: null,
  userActivity: [],
  userCourses: [],
  allCourses: [],
  isLoadingUser: true,
  
  setUser: (user) => set({ user }),
  
  fetchUser: async () => {
    
  },

  enrollInCourse: async (courseId: string) => {
    
  },
}));
