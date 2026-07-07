import { Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  LayoutDashboard,
  LogOut,
  Moon,
  PawPrint,
  Shield,
  Sparkles,
  Stethoscope,
  Sun,
  User as UserIcon,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";
import { useTheme } from "@/lib/use-theme";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/pets", label: "My Pets", icon: PawPrint },
  { to: "/dashboard/services", label: "Services", icon: Stethoscope },
  { to: "/dashboard/book", label: "Book", icon: Sparkles },
  { to: "/dashboard/appointments", label: "Appointments", icon: CalendarCheck2 },
  { to: "/dashboard/profile", label: "Profile", icon: UserIcon },
];

export function DashboardShell() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (ready && !user) router.navigate({ to: "/login" });
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const nav = user.role === "admin"
    ? [...items, { to: "/dashboard/admin", label: "Admin", icon: Shield }]
    : items;

  return (
    <div className="relative min-h-screen bg-background">
      <div className="floating-blobs opacity-40" />
      <div className="relative mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-2xl p-4 glass lg:flex">
          <Link to="/" className="flex items-center gap-2 px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-bg text-white">
              <PawPrint className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">Paw<span className="gradient-text">Pal</span></span>
          </Link>
          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {nav.map((it) => {
              const active = it.end ? pathname === it.to : pathname === it.to || pathname.startsWith(it.to + "/");
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "gradient-bg text-white shadow-md"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <it.icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-border/60 p-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-bg text-sm font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.email}</div>
            </div>
            <button
              onClick={() => {
                logout();
                toast.success("Signed out");
                router.navigate({ to: "/" });
              }}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <div className="mb-4 flex items-center justify-between rounded-2xl p-3 glass lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-white">
                <PawPrint className="h-4 w-4" />
              </div>
              <span className="font-bold">PawPal</span>
            </Link>
            <div className="flex items-center gap-1 overflow-x-auto">
              {nav.map((it) => {
                const active = it.end ? pathname === it.to : pathname.startsWith(it.to);
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                      active ? "gradient-bg text-white" : "text-muted-foreground hover:bg-secondary"
                    }`}
                    aria-label={it.label}
                  >
                    <it.icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pb-4">
            <Button variant="outline" size="sm" onClick={toggle} className="rounded-xl">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
