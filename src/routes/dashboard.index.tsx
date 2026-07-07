import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarCheck2, PawPrint, Plus, Sparkles, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appointments, pets, services } from "@/lib/store";
import { useAuth, useStoreVersion } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  useStoreVersion();
  const { user } = useAuth();
  if (!user) return null;
  const myPets = pets.listForUser(user.id);
  const myAppts = appointments.listForUser(user.id).sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = myAppts.find((a) => a.status === "Upcoming" && a.date >= new Date().toISOString().slice(0, 10));

  const stats = [
    { icon: PawPrint, label: "Total pets", value: myPets.length, color: "from-brand to-brand-2" },
    { icon: CalendarCheck2, label: "Upcoming", value: myAppts.filter((a) => a.status === "Upcoming").length },
    { icon: Sparkles, label: "Completed", value: myAppts.filter((a) => a.status === "Completed").length },
    { icon: Stethoscope, label: "Services", value: services.list().length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Welcome back, <span className="gradient-text">{user.name.split(" ")[0]}</span> 👋
        </motion.h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with your pets today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl p-5 glass hover-lift"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="mt-3 text-3xl font-bold">
              <AnimatedNumber value={s.value} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 glass lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming appointment</h2>
            <Link to="/dashboard/appointments" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {upcoming ? (
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border/60 p-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-bg text-white shadow-md">
                <CalendarCheck2 className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">
                  {pets.get(upcoming.petId)?.name} · {services.get(upcoming.serviceId)?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(upcoming.date).toLocaleDateString(undefined, { dateStyle: "full" })} · {upcoming.time}
                </div>
              </div>
              <Link to="/dashboard/appointments">
                <Button variant="outline" size="sm">Manage</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">
              No upcoming appointments.{" "}
              <Link to="/dashboard/book" className="font-medium text-primary hover:underline">Book one now</Link>.
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 glass"
        >
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-2">
            <Link to="/dashboard/book">
              <Button className="w-full justify-start gradient-bg text-white">
                <Plus className="mr-2 h-4 w-4" /> Book appointment
              </Button>
            </Link>
            <Link to="/dashboard/pets">
              <Button variant="outline" className="w-full justify-start">
                <PawPrint className="mr-2 h-4 w-4" /> Add pet
              </Button>
            </Link>
            <Link to="/dashboard/services">
              <Button variant="outline" className="w-full justify-start">
                <Stethoscope className="mr-2 h-4 w-4" /> Browse services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 glass"
      >
        <h2 className="text-lg font-semibold">Recent activity</h2>
        {myAppts.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Nothing yet — book your first appointment.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border/60">
            {myAppts.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {services.get(a.serviceId)?.name} · {pets.get(a.petId)?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(a.date).toLocaleDateString()} · {a.time}
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="tabular-nums"
    >
      {value}
    </motion.span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Upcoming: "bg-primary/10 text-primary border-primary/20",
    Completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>{status}</span>
  );
}
