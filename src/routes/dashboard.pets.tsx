import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Cat, Dog, Pencil, Plus, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState, PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { pets as petsApi } from "@/lib/store";
import type { Pet } from "@/lib/types";
import { useAuth, useStoreVersion } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard/pets")({
  component: PetsPage,
});

type FormState = Omit<Pet, "id" | "userId">;

const empty: FormState = { name: "", species: "Dog", breed: "", age: 1, gender: "Male", vaccinated: false };

function PetsPage() {
  useStoreVersion();
  const { user } = useAuth();
  const [dialog, setDialog] = useState<{ open: boolean; editing?: Pet }>({ open: false });
  const [form, setForm] = useState<FormState>(empty);

  if (!user) return null;
  const pets = petsApi.listForUser(user.id);

  const openCreate = () => {
    setForm(empty);
    setDialog({ open: true });
  };
  const openEdit = (pet: Pet) => {
    const { id: _id, userId: _u, ...rest } = pet;
    setForm(rest);
    setDialog({ open: true, editing: pet });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dialog.editing) {
      petsApi.update(dialog.editing.id, form);
      toast.success(`${form.name} updated`);
    } else {
      petsApi.create({ ...form, userId: user.id });
      toast.success(`${form.name} added to your family 🐾`);
    }
    setDialog({ open: false });
  };

  const remove = (pet: Pet) => {
    petsApi.remove(pet.id);
    toast.success(`${pet.name} removed`);
  };

  return (
    <div>
      <PageHeader
        title="My Pets"
        subtitle="Manage your furry family members."
        action={
          <Button onClick={openCreate} className="gradient-bg text-white shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add pet
          </Button>
        }
      />

      {pets.length === 0 ? (
        <EmptyState
          icon={Dog}
          title="No pets yet"
          subtitle="Add your first pet to start booking appointments."
          action={<Button onClick={openCreate} className="gradient-bg text-white"><Plus className="mr-2 h-4 w-4" /> Add pet</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5 glass hover-lift"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-bg text-white shadow-md">
                  {p.species.toLowerCase() === "cat" ? <Cat className="h-6 w-6" /> : <Dog className="h-6 w-6" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-lg font-semibold">{p.name}</div>
                  <div className="truncate text-sm text-muted-foreground">{p.breed}</div>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-secondary/60 p-2">
                  <dt className="text-muted-foreground">Age</dt>
                  <dd className="font-semibold">{p.age} yr</dd>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2">
                  <dt className="text-muted-foreground">Gender</dt>
                  <dd className="font-semibold">{p.gender}</dd>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2">
                  <dt className="text-muted-foreground">Vax</dt>
                  <dd className={`inline-flex items-center gap-1 font-semibold ${p.vaccinated ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {p.vaccinated ? <ShieldCheck className="h-3 w-3" /> : <ShieldOff className="h-3 w-3" />}
                    {p.vaccinated ? "Yes" : "No"}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(p)}>
                  <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => remove(p)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={dialog.open} onOpenChange={(o) => setDialog({ open: o })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog.editing ? "Edit pet" : "Add a pet"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Species</Label>
                <Select value={form.species} onValueChange={(v) => setForm({ ...form, species: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Dog", "Cat", "Bird", "Rabbit", "Other"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Breed</Label>
                <Input value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Age (years)</Label>
                <Input type="number" min={0} max={40} value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as "Male" | "Female" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">Vaccinated</div>
                <div className="text-xs text-muted-foreground">Up to date on vaccines</div>
              </div>
              <Switch checked={form.vaccinated} onCheckedChange={(v) => setForm({ ...form, vaccinated: v })} />
            </div>
            <DialogFooter>
              <Button type="submit" className="gradient-bg text-white">
                {dialog.editing ? "Save changes" : "Add pet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
