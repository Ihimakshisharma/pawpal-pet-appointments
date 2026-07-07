import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { services as servicesApi } from "@/lib/store";

export const Route = createFileRoute("/dashboard/services")({
  component: ServicesPage,
});

function ServicesPage() {
  const router = useRouter();
  const services = servicesApi.list();
  return (
    <div>
      <PageHeader title="Services" subtitle="Certified providers, transparent pricing, zero friction." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Icons.Sparkles;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl p-6 glass hover-lift"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:gradient-bg group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{s.price}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.duration}</span>
                <Button
                  size="sm"
                  onClick={() => router.navigate({ to: "/dashboard/book", search: { service: s.id } })}
                  className="gradient-bg text-white"
                >
                  Book
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
