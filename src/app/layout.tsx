import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Next-Learn",
  description: "Next-Gen Learning Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className="bg-neutral-950 text-neutral-50 h-screen w-screen overflow-hidden flex flex-col md:flex-row">
        <div className="md:hidden flex items-center justify-between p-4 bg-neutral-950/80 border-b border-neutral-800 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-lg">Next-Learn</span>
          </div>
        </div>

        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
          
          <div className="p-4 md:p-8 max-w-7xl mx-auto h-full relative z-10 pb-24 md:pb-8">
            {children}
          </div>
        </main>
        
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
