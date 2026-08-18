import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { AppHeader } from "@/components/AppHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen print:min-h-0">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <MobileNav />
        <main className="flex flex-1 flex-wrap items-start gap-6 p-4 sm:p-8 print:p-0">{children}</main>
      </div>
    </div>
  );
}
