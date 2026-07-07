import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — PawPal" }] }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@pawpal.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate a small delay so the loading state feels real
      await new Promise((r) => setTimeout(r, 400));
      const user = auth.login(email, password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      router.navigate({ to: user.role === "admin" ? "/dashboard/admin" : "/dashboard" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return <AuthShell title="Welcome back" subtitle="Sign in to your PawPal account">
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
        </div>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
      </div>
      <Button type="submit" disabled={loading} className="w-full gradient-bg text-white shadow-md hover:opacity-95">
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Create one</Link>
      </p>
      <div className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
        <div><strong className="text-foreground">Demo user:</strong> demo@pawpal.com / demo123</div>
        <div><strong className="text-foreground">Admin:</strong> admin@pawpal.com / admin123</div>
      </div>
    </form>
  </AuthShell>;
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div className="floating-blobs" />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl p-8 glass"
      >
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
            <PawPrint className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Paw<span className="gradient-text">Pal</span></span>
        </Link>
        <h1 className="text-center text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-center text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </motion.div>
    </div>
  );
}
