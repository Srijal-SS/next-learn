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
    set({ isLoadingUser: true });
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const [
        { data: profile },
        { data: userActivity },
        { data: userCourses },
        { data: allCourses }
      ] = await Promise.all([
        supabase.from('profiles').select('streak').eq('id', user.id).maybeSingle(),
        supabase.from('user_activity').select('*').eq('user_id', user.id).order('activity_date', { ascending: false }).limit(28),
        supabase.from('user_courses').select('id, course_id, progress, courses(title, icon_name)').eq('user_id', user.id),
        supabase.from('courses').select('*').order('created_at', { ascending: false })
      ]);
      
      let currentStreak = profile?.streak || 0;
      const todayDate = new Date().toISOString().split('T')[0];
      
      // Check if user already has activity today
      const hasActivityToday = userActivity?.some(a => a.activity_date === todayDate);
      
      if (!hasActivityToday) {
        // Increment streak and log activity for today
        currentStreak += 1;
        
        // Optimistic UI update and async DB update
        supabase.from('profiles').upsert({ id: user.id, streak: currentStreak }).then();
        supabase.from('user_activity').insert({ user_id: user.id, activity_date: todayDate, level: 1 }).then();
        
        // Add to local state
        if (userActivity) {
          userActivity.unshift({ id: 'temp-id', activity_date: todayDate, level: 1 } as any);
        }
      }

      set({ 
        user, 
        profile: { streak: currentStreak }, 
        userActivity: userActivity || [], 
        userCourses: (userCourses as any) || [],
        allCourses: allCourses || [],
        isLoadingUser: false 
      });
    } else {
      const { data: allCourses } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      set({ 
        user: null, 
        profile: null, 
        userActivity: [], 
        userCourses: [], 
        allCourses: allCourses || [],
        isLoadingUser: false 
      });
    }
  },

  enrollInCourse: async (courseId: string) => {
    const { user, userCourses } = get();
    if (!user) return;

    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_courses')
      .insert({ user_id: user.id, course_id: courseId, progress: 0 })
      .select('id, course_id, progress, courses(title, icon_name)')
      .single();

    if (!error && data) {
      set({ userCourses: [...userCourses, data as any] });
      toast.success("Successfully enrolled!");
    }
  },
}));
