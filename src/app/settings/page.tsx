"use client";

import { User } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";
import { useStore } from "@/store/useStore";

export default function SettingsPage() {
    const { user } = useStore();

    return (
        <div className="flex flex-col gap-8 w-full pb-20 md:pb-0 max-w-2xl">
            <header>
                <h1 className="text-2xl font-semibold">Settings</h1>
                <p className="text-neutral-400 text-sm mt-1">Manage your account and preferences</p>
            </header>

            <section className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
                <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Profile</h2>
                <div className="flex items-center gap-4">
                    {user?.user_metadata?.avatar_url ? (
                        <img
                            src={user.user_metadata.avatar_url}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-2 border-neutral-700"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-neutral-700 flex items-center justify-center">
                            <User className="w-7 h-7 text-indigo-400" />
                        </div>
                    )}
                    <div>
                        <p className="font-semibold text-white">
                            {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
                        </p>
                        <p className="text-sm text-neutral-400">{user?.email}</p>
                    </div>
                </div>
            </section>

    <section className="bg-neutral-900/80 border border-red-900/20 rounded-2xl p-6">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Account</h2>
        <SignOutButton />
    </section>
    </div >
  );
}
