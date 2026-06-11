"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors py-3 px-4 rounded-xl font-medium"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </Button>
  );
}
