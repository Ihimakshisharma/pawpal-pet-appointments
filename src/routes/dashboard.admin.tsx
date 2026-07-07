import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarCheck2, PawPrint, Trash2, Users } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { StatusBadge } from "./dashboard.index";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appointments, pets, services, users } from "@/lib/store";
import { useAuth, useStoreVersion } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminPage,
});

function AdminPage() {
  useStoreVersion();
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && (!user || user.role !== "admin")) {
      toast.error("Admin access required");
      router.navigate({ to: "/dashboard" });
    }
  }, [ready, user, router]);

  if (!user || user.role !== "admin") return null;

  const allUsers = users.listAll();
  const allPets = pets.listAll();
  const allAppts = appointments.listAll();

  const removeAppt = (id: string) => {
    appointments.remove(id);
    toast.success("Appointment deleted");
  };

  const stats = [
    { icon: Users, label: "Users", value: allUsers.length },
    { icon: PawPrint, label: "Pets", value: allPets.length },
    { icon: CalendarCheck2, label: "Appointments", value: allAppts.length },
  ];

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Overview of the PawPal platform." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="rounded-2xl p-5 glass hover-lift"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white"><s.icon className="h-5 w-5" /></div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="mt-3 text-3xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="appointments" className="rounded-2xl p-6 glass">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pets">Pets</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppts.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{pets.get(a.petId)?.name ?? "-"}</TableCell>
                  <TableCell>{services.get(a.serviceId)?.name ?? "-"}</TableCell>
                  <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => removeAppt(a.id)} className="text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="users" className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary"}`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="pets" className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPets.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.species}</TableCell>
                  <TableCell>{p.breed}</TableCell>
                  <TableCell>{p.age} yr</TableCell>
                  <TableCell>{allUsers.find((u) => u.id === p.userId)?.name ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
