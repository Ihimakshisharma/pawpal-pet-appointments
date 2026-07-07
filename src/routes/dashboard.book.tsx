import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, PawPrint, PartyPopper, Sparkles, Stethoscope } from "lucide-react";
import * as Icons from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { appointments, pets, services } from "@/lib/store";
import { useAuth, useStoreVersion } from "@/lib/use-auth";

const searchSchema = z.object({
  service: z.string().optional(),
  pet: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/book")({
  validateSearch: searchSchema,
  component: BookPage,
});

const TIMES = ["09:00", "10:00", "11:00", "13:00", "14:30", "16:00", "17:30"];

function BookPage() {
  useStoreVersion();
  const { user } = useAuth();
  const router = useRouter();
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [petId, setPetId] = useState<string>(search.pet ?? "");
  const [serviceId, setServiceId] = useState<string>(search.service ?? "");
  const [date, setDate] = useState<string>(() => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);

  if (!user) return null;
  const myPets = pets.listForUser(user.id);
  const allServices = services.list();

  const steps = ["Pet", "Service", "Date", "Time", "Confirm"];
  const canNext = useMemo(() => {
    switch (step) {
      case 0: return !!petId;
      case 1: return !!serviceId;
      case 2: return !!date;
      case 3: return !!time;
      default: return true;
    }
  }, [step, petId, serviceId, date, time]);

  const submit = () => {
    appointments.create({ userId: user.id, petId, serviceId, date, time });
    setDone(true);
    toast.success("Appointment booked!");
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl p-10 text-center glass"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-bg text-white shadow-xl"
          >
            <Check className="h-10 w-10" strokeWidth={3} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-6 text-2xl font-bold"
          >
            Appointment Booked Successfully <PartyPopper className="inline h-5 w-5 text-accent" />
          </motion.h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {pets.get(petId)?.name} · {services.get(serviceId)?.name}<br />
            {new Date(date).toLocaleDateString(undefined, { dateStyle: "full" })} at {time}
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" onClick={() => router.navigate({ to: "/dashboard/appointments" })}>
              View appointments
            </Button>
            <Button className="gradient-bg text-white" onClick={() => { setDone(false); setStep(0); setPetId(""); setServiceId(""); setTime(""); }}>
              Book another
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Book an Appointment" subtitle="It only takes a moment." />
      {myPets.length === 0 && (
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
          You need to add a pet first.{" "}
          <a href="/dashboard/pets" className="font-medium text-primary hover:underline">Add pet →</a>
        </div>
      )}
      <div className="rounded-2xl p-6 glass sm:p-8">
        {/* Stepper */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-all ${
                i < step ? "gradient-bg text-white"
                : i === step ? "gradient-bg text-white shadow-md scale-110"
                : "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-xs font-medium sm:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? "gradient-bg" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="min-h-[280px]"
          >
            {step === 0 && (
              <StepGrid title="Choose a pet" icon={PawPrint}>
                {myPets.map((p) => (
                  <ChoiceCard key={p.id} active={petId === p.id} onClick={() => setPetId(p.id)}>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.breed}</div>
                  </ChoiceCard>
                ))}
              </StepGrid>
            )}
            {step === 1 && (
              <StepGrid title="Choose a service" icon={Stethoscope}>
                {allServices.map((s) => {
                  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Sparkles;
                  return (
                    <ChoiceCard key={s.id} active={serviceId === s.id} onClick={() => setServiceId(s.id)}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <div className="font-semibold">{s.name}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{s.price} · {s.duration}</div>
                    </ChoiceCard>
                  );
                })}
              </StepGrid>
            )}
            {step === 2 && (
              <div>
                <StepHeader icon={CalendarDays} title="Choose a date" />
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full max-w-xs rounded-xl border border-input bg-background px-4 py-3 text-lg font-medium focus:border-primary focus:outline-none"
                />
              </div>
            )}
            {step === 3 && (
              <StepGrid title="Choose a time" icon={Clock}>
                {TIMES.map((t) => (
                  <ChoiceCard key={t} active={time === t} onClick={() => setTime(t)}>
                    <div className="text-center font-semibold">{t}</div>
                  </ChoiceCard>
                ))}
              </StepGrid>
            )}
            {step === 4 && (
              <div>
                <StepHeader icon={Check} title="Confirm your appointment" />
                <div className="mt-2 space-y-3 rounded-2xl border border-border p-5">
                  <Row label="Pet" value={pets.get(petId)?.name ?? "-"} />
                  <Row label="Service" value={services.get(serviceId)?.name ?? "-"} />
                  <Row label="Date" value={new Date(date).toLocaleDateString(undefined, { dateStyle: "full" })} />
                  <Row label="Time" value={time} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="gradient-bg text-white">
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit} className="gradient-bg text-white">Confirm booking</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-white"><Icon className="h-4 w-4" /></div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

function StepGrid({ title, icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <StepHeader icon={icon} title={title} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}

function ChoiceCard({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-all ${
        active ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/30" : "border-border hover:border-primary/50 hover:bg-secondary/50"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
