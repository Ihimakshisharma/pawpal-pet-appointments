import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/store";
import { useAuth } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    avatar: user?.avatar ?? "",
  });

  if (!user) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.updateProfile(form);
    refresh();
    toast.success("Profile updated");
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Profile" subtitle="Keep your info up to date." />
      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="space-y-6 rounded-2xl p-8 glass"
      >
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-full gradient-bg text-2xl font-bold text-white shadow-lg">
              {form.avatar ? <img src={form.avatar} alt="" className="h-full w-full object-cover" /> : form.name.charAt(0).toUpperCase()}
            </div>
            <label className="absolute -bottom-1 -right-1 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-border bg-background shadow hover:bg-secondary">
              <Camera className="h-4 w-4" />
              <input type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
          </div>
          <div className="min-w-0">
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="truncate text-sm text-muted-foreground">{user.email}</div>
            <div className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {user.role === "admin" ? "Admin" : "Pet parent"}
            </div>
          </div>
        </div>

        <div>
          <Label>Full name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div>
          <Label>Address</Label>
          <Textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>

        <Button type="submit" className="w-full gradient-bg text-white">Save changes</Button>
      </motion.form>
    </div>
  );
}
