import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  ChevronDown,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  PawPrint,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Zap, title: "Instant Booking", body: "Book any service in under 60 seconds — no phone calls needed." },
  { icon: ShieldCheck, title: "Trusted Vets", body: "Every provider is background-checked and certified." },
  { icon: Heart, title: "Pet-first Care", body: "Personalized plans built around each pet's needs." },
  { icon: Sparkles, title: "Beautiful UX", body: "Designed to feel calm, clear and completely delightful." },
];

const services = [
  { icon: Stethoscope, title: "Vet Consultation", body: "Regular checkups and diagnostics." },
  { icon: Scissors, title: "Grooming", body: "Bath, haircut & spa treatment." },
  { icon: Syringe, title: "Vaccination", body: "Personalized vaccination schedule." },
  { icon: GraduationCap, title: "Training", body: "Positive-reinforcement behavior training." },
  { icon: Home, title: "Day Care", body: "Safe, social daycare while you're away." },
];

const testimonials = [
  { name: "Sophia R.", role: "Cat mom to Milo", body: "PawPal made booking a vet appointment feel effortless. The UI is gorgeous." },
  { name: "Daniel K.", role: "Dog dad to Rex",  body: "Grooming, training, vaccines — all in one place. Truly a game changer." },
  { name: "Ana L.",    role: "Two rescues",     body: "Reminders, history, everything organised. I finally feel on top of pet care." },
];

const faqs = [
  { q: "Is PawPal free to use?", a: "Yes, creating an account and booking is free. You only pay for the services you book." },
  { q: "Can I cancel an appointment?", a: "Absolutely — you can cancel any upcoming appointment from your dashboard." },
  { q: "How do you choose your providers?", a: "Every provider is licensed, insured and reviewed by pet parents like you." },
  { q: "Do you support multiple pets?", a: "Of course. Add as many pets as you like and manage them all from one place." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="floating-blobs" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New — Book any pet service in seconds
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Pet care, <span className="gradient-text">reimagined</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              PawPal is the delightful portal for booking vet visits, grooming, training and more —
              built for busy pet parents who care deeply.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg" className="gradient-bg text-white shadow-lg hover-lift">
                  Book Appointment
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#services">
                <Button size="lg" variant="outline" className="hover-lift">
                  Explore services
                </Button>
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold text-foreground">4.9/5</span>
              </div>
              <div>from 12,000+ happy pet parents</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl glass p-3">
              <img src={heroImage} alt="Happy pets" width={1280} height={1024} className="w-full rounded-2xl" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl p-4 glass sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Next appointment</div>
                  <div className="text-sm font-semibold">Luna · Vet · Tue 10:00</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-6 -right-4 hidden rounded-2xl p-4 glass sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Pets cared for</div>
                  <div className="text-sm font-semibold">28,410+</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <Section>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { k: "28k+", v: "Pets cared for" },
            { k: "1.2k",  v: "Certified providers" },
            { k: "60s",   v: "Avg booking time" },
            { k: "4.9★",  v: "Average rating" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5 text-center glass hover-lift"
            >
              <div className="text-2xl font-bold gradient-text sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section id="features">
        <SectionHeader eyebrow="Why PawPal" title="Everything your pet needs, one place." subtitle="A calm, opinionated experience that keeps pet care simple." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-6 glass hover-lift"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white shadow-md">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section id="services">
        <SectionHeader eyebrow="Services" title="Book what your pet needs." subtitle="Certified professionals, transparent pricing, zero friction." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl p-6 glass hover-lift"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:gradient-bg group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              <Link to="/register" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                Book now <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">About PawPal</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built by pet lovers, for pet lovers.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We started PawPal because booking pet care shouldn't be harder than booking a table.
              Our mission is to make world-class pet care accessible, transparent and joyful.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Personalized care plans", "Trusted, certified providers", "Reminders you'll actually love"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full gradient-bg text-white">
                    <PawPrint className="h-3 w-3" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="rounded-3xl p-8 glass">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { k: "5+ yrs", v: "Serving pets" },
                  { k: "50 cities", v: "and counting" },
                  { k: "24/7", v: "Support" },
                  { k: "0", v: "Booking fees" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl bg-secondary/50 p-4 text-center">
                    <div className="text-xl font-bold gradient-text">{s.k}</div>
                    <div className="text-xs text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader eyebrow="Loved by pet parents" title="Thousands of tails wagging." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 glass hover-lift"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mt-3 text-sm">"{t.body}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-bg font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeader eyebrow="FAQ" title="Questions? We have answers." />
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl p-2 glass">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60 last:border-0">
                <AccordionTrigger className="px-4 text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Contact" title="Say hello." subtitle="We usually reply within a few hours." align="left" />
            <div className="mt-6 space-y-4 text-sm">
              {[
                { i: Mail, t: "hello@pawpal.com" },
                { i: Phone, t: "+1 (555) 010 4242" },
                { i: MapPin, t: "742 Evergreen Terrace, SF" },
              ].map(({ i: I, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
                    <I className="h-4 w-4" />
                  </div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent!", { description: "We'll reply within a few hours." });
              (e.target as HTMLFormElement).reset();
            }}
            className="rounded-2xl p-6 glass"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required placeholder="Your name" />
              <Input required type="email" placeholder="Email" />
            </div>
            <Input required placeholder="Subject" className="mt-4" />
            <Textarea required placeholder="Message" rows={5} className="mt-4" />
            <Button type="submit" className="mt-4 w-full gradient-bg text-white">
              <MessageCircle className="mr-2 h-4 w-4" /> Send message
            </Button>
          </form>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 text-center glass sm:p-16">
          <div className="floating-blobs opacity-70" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to give your pet <span className="gradient-text">the best</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Join thousands of happy pet parents. Sign up in seconds.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/register">
                <Button size="lg" className="gradient-bg text-white shadow-lg hover-lift">
                  Book Appointment <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
