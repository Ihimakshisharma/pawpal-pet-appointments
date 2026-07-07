import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, PawPrint, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";
import { useTheme } from "@/lib/use-theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#services", label: "Services" },
  { to: "/#about", label: "About" },
  { to: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:top-6 sm:px-6 glass"
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-bg text-white shadow-lg">
          <PawPrint className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">
          Paw<span className="gradient-text">Pal</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <a
            key={l.to}
            href={l.to}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 md:flex">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        {user ? (
          <Button
            onClick={() => router.navigate({ to: "/dashboard" })}
            className="gradient-bg text-white shadow-md hover:opacity-95"
          >
            Dashboard
          </Button>
        ) : (
          <>
            <Button variant="ghost" onClick={() => router.navigate({ to: "/login" })}>
              Sign in
            </Button>
            <Button
              onClick={() => router.navigate({ to: "/register" })}
              className="gradient-bg text-white shadow-md hover:opacity-95"
            >
              Get started
            </Button>
          </>
        )}
      </div>

      <button
        className="grid h-9 w-9 place-items-center rounded-lg md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-2 right-2 top-full mt-2 rounded-2xl p-4 glass md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={toggle}>
                  {theme === "dark" ? "Light" : "Dark"} mode
                </Button>
                {user ? (
                  <Button className="flex-1 gradient-bg text-white" onClick={() => router.navigate({ to: "/dashboard" })}>
                    Dashboard
                  </Button>
                ) : (
                  <Button className="flex-1 gradient-bg text-white" onClick={() => router.navigate({ to: "/login" })}>
                    Sign in
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
