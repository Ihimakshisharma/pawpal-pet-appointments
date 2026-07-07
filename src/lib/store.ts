// Client-side mock backend for PawPal (localStorage).
// A real Express + MongoDB backend lives in /server (see README).
import { SEED_APPOINTMENTS, SEED_PETS, SEED_USERS, SERVICES } from "./seed";
import type { Appointment, Pet, Service, User } from "./types";

const K = {
  users: "pawpal:users",
  pets: "pawpal:pets",
  appts: "pawpal:appointments",
  token: "pawpal:token",
  seeded: "pawpal:seeded:v1",
};

const isBrowser = () => typeof window !== "undefined";

function ensureSeeded() {
  if (!isBrowser()) return;
  if (localStorage.getItem(K.seeded)) return;
  localStorage.setItem(K.users, JSON.stringify(SEED_USERS));
  localStorage.setItem(K.pets, JSON.stringify(SEED_PETS));
  localStorage.setItem(K.appts, JSON.stringify(SEED_APPOINTMENTS));
  localStorage.setItem(K.seeded, "1");
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  ensureSeeded();
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new CustomEvent("pawpal:change", { detail: key }));
}

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

// ---------- Auth ----------
export const auth = {
  currentUser(): User | null {
    if (!isBrowser()) return null;
    const token = localStorage.getItem(K.token);
    if (!token) return null;
    const users = read<User[]>(K.users, []);
    return users.find((u) => u.id === token) ?? null;
  },
  login(email: string, password: string): User {
    const users = read<User[]>(K.users, []);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    localStorage.setItem(K.token, user.id);
    window.dispatchEvent(new Event("pawpal:auth"));
    return user;
  },
  register(input: { name: string; email: string; password: string }): User {
    const users = read<User[]>(K.users, []);
    if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
      throw new Error("An account with that email already exists");
    }
    const user: User = {
      id: uid("u"),
      name: input.name,
      email: input.email,
      password: input.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    write(K.users, [...users, user]);
    localStorage.setItem(K.token, user.id);
    window.dispatchEvent(new Event("pawpal:auth"));
    return user;
  },
  logout() {
    localStorage.removeItem(K.token);
    window.dispatchEvent(new Event("pawpal:auth"));
  },
  updateProfile(patch: Partial<User>) {
    const user = auth.currentUser();
    if (!user) throw new Error("Not authenticated");
    const users = read<User[]>(K.users, []);
    const next = users.map((u) => (u.id === user.id ? { ...u, ...patch } : u));
    write(K.users, next);
    return next.find((u) => u.id === user.id)!;
  },
};

// ---------- Pets ----------
export const pets = {
  listForUser(userId: string): Pet[] {
    return read<Pet[]>(K.pets, []).filter((p) => p.userId === userId);
  },
  listAll(): Pet[] {
    return read<Pet[]>(K.pets, []);
  },
  get(id: string): Pet | undefined {
    return read<Pet[]>(K.pets, []).find((p) => p.id === id);
  },
  create(input: Omit<Pet, "id">): Pet {
    const pet: Pet = { ...input, id: uid("p") };
    write(K.pets, [...read<Pet[]>(K.pets, []), pet]);
    return pet;
  },
  update(id: string, patch: Partial<Pet>): Pet {
    const list = read<Pet[]>(K.pets, []).map((p) => (p.id === id ? { ...p, ...patch } : p));
    write(K.pets, list);
    return list.find((p) => p.id === id)!;
  },
  remove(id: string) {
    write(K.pets, read<Pet[]>(K.pets, []).filter((p) => p.id !== id));
    // cascade cancel appointments
    const appts = read<Appointment[]>(K.appts, []).filter((a) => a.petId !== id);
    write(K.appts, appts);
  },
};

// ---------- Appointments ----------
export const appointments = {
  listForUser(userId: string): Appointment[] {
    return read<Appointment[]>(K.appts, []).filter((a) => a.userId === userId);
  },
  listAll(): Appointment[] {
    return read<Appointment[]>(K.appts, []);
  },
  create(input: Omit<Appointment, "id" | "createdAt" | "status"> & { status?: Appointment["status"] }): Appointment {
    const appt: Appointment = {
      ...input,
      id: uid("a"),
      status: input.status ?? "Upcoming",
      createdAt: new Date().toISOString(),
    };
    write(K.appts, [...read<Appointment[]>(K.appts, []), appt]);
    return appt;
  },
  cancel(id: string) {
    const list = read<Appointment[]>(K.appts, []).map((a) =>
      a.id === id ? { ...a, status: "Cancelled" as const } : a,
    );
    write(K.appts, list);
  },
  remove(id: string) {
    write(K.appts, read<Appointment[]>(K.appts, []).filter((a) => a.id !== id));
  },
};

// ---------- Users (admin) ----------
export const users = {
  listAll(): User[] {
    return read<User[]>(K.users, []);
  },
};

// ---------- Services (static) ----------
export const services = {
  list(): Service[] {
    return SERVICES;
  },
  get(id: string): Service | undefined {
    return SERVICES.find((s) => s.id === id);
  },
};
