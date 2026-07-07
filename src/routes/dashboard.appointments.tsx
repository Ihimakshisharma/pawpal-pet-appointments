import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarCheck2, Clock, Plus, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "./dashboard.index";
import { EmptyState, PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { appointments, pets, services } from "@/lib/store";
import { useAuth, useStoreVersion } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard/appointments")({
  component: AppointmentsPage,
});

function AppointmentsPage() {
  useStoreVersion();
  const { user } = useAuth();
  if (!user) return null;
  const list = appointments.listForUser(user.id).sort((a, b) => b.date.localeCompare(a.date));

  const cancel = (id: string) => {
    appointments.cancel(id);
    toast.success("Appointment cancelled");
  };

  return (
    <div>
      <PageHeader
        title="My Appointments"
        subtitle="Everything you've booked, in one place."
        action={
          <Link to="/dashboard/book">
            <Button className="gradient-bg text-white shadow-md"><Plus className="mr-2 h-4 w-4" /> Book</Button>
          </Link>
        }
      />
      {list.length === 0 ? (
        <EmptyState
          icon={CalendarCheck2}
          title="No appointments yet"
          subtitle="Book your first appointment in less than a minute."
          action={<Link to="/dashboard/book"><Button className="gradient-bg text-white"><Plus className="mr-2 h-4 w-4" /> Book now</Button></Link>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => {
            const pet = pets.get(a.petId);
            const svc = services.get(a.serviceId);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-5 glass hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                    <CalendarCheck2 className="h-5 w-5" />
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="mt-4 text-lg font-semibold">{svc?.name ?? "Service"}</div>
                <div className="text-sm text-muted-foreground">for {pet?.name ?? "Pet"}</div>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <CalendarCheck2 className="h-3.5 w-3.5" />
                    {new Date(a.date).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {a.time}
                  </span>
                </div>
                {a.status === "Upcoming" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancel(a.id)}
                    className="mt-4 w-full text-destructive hover:text-destructive"
                  >
                    <XCircle className="mr-1 h-4 w-4" /> Cancel appointment
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
