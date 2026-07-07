import type { Appointment, Pet, Service, User } from "./types";

export const SERVICES: Service[] = [
  {
    id: "svc-vet",
    name: "Veterinary Consultation",
    description: "Comprehensive health check-ups by certified veterinarians.",
    icon: "Stethoscope",
    duration: "30 min",
    price: "$45",
  },
  {
    id: "svc-groom",
    name: "Grooming",
    description: "Bath, haircut, nail trim, ear cleaning — the full spa treatment.",
    icon: "Scissors",
    duration: "60 min",
    price: "$35",
  },
  {
    id: "svc-vacc",
    name: "Vaccination",
    description: "Keep your pet protected with a personalized vaccination schedule.",
    icon: "Syringe",
    duration: "20 min",
    price: "$30",
  },
  {
    id: "svc-train",
    name: "Training",
    description: "Behavior training sessions from award-winning trainers.",
    icon: "GraduationCap",
    duration: "45 min",
    price: "$40",
  },
  {
    id: "svc-daycare",
    name: "Day Care",
    description: "Safe, social, supervised daycare while you're away.",
    icon: "Home",
    duration: "1 day",
    price: "$25",
  },
];

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const inDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return iso(d);
};

export const SEED_USERS: User[] = [
  {
    id: "u-admin",
    name: "Admin",
    email: "admin@pawpal.com",
    password: "admin123",
    phone: "+1 555 010 0001",
    address: "PawPal HQ, San Francisco",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-demo",
    name: "Alex Morgan",
    email: "demo@pawpal.com",
    password: "demo123",
    phone: "+1 555 010 4242",
    address: "742 Evergreen Terrace",
    role: "user",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-2",
    name: "Priya Patel",
    email: "priya@example.com",
    password: "password",
    phone: "+1 555 010 7788",
    address: "18 Baker Street",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

export const SEED_PETS: Pet[] = [
  { id: "p-1", userId: "u-demo", name: "Luna", species: "Dog", breed: "Golden Retriever", age: 3, gender: "Female", vaccinated: true },
  { id: "p-2", userId: "u-demo", name: "Milo",  species: "Cat", breed: "British Shorthair", age: 2, gender: "Male",   vaccinated: true },
  { id: "p-3", userId: "u-demo", name: "Coco",  species: "Dog", breed: "French Bulldog",    age: 1, gender: "Female", vaccinated: false },
  { id: "p-4", userId: "u-2",    name: "Simba", species: "Cat", breed: "Maine Coon",        age: 4, gender: "Male",   vaccinated: true },
];

export const SEED_APPOINTMENTS: Appointment[] = [
  { id: "a-1", userId: "u-demo", petId: "p-1", serviceId: "svc-vet",     date: inDays(2),  time: "10:00", status: "Upcoming",  createdAt: new Date().toISOString() },
  { id: "a-2", userId: "u-demo", petId: "p-2", serviceId: "svc-groom",   date: inDays(5),  time: "14:30", status: "Upcoming",  createdAt: new Date().toISOString() },
  { id: "a-3", userId: "u-demo", petId: "p-3", serviceId: "svc-vacc",    date: inDays(-4), time: "09:00", status: "Completed", createdAt: new Date().toISOString() },
  { id: "a-4", userId: "u-2",    petId: "p-4", serviceId: "svc-train",   date: inDays(1),  time: "16:00", status: "Upcoming",  createdAt: new Date().toISOString() },
];
