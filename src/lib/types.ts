// Type definitions for PawPal
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // plain in mock; real backend uses bcrypt+jwt
  phone?: string;
  address?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: "Male" | "Female";
  vaccinated: boolean;
  image?: string;
}

export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";

export interface Appointment {
  id: string;
  userId: string;
  petId: string;
  serviceId: string;
  date: string; // ISO date
  time: string; // "10:00"
  status: AppointmentStatus;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  duration: string;
  price: string;
}
