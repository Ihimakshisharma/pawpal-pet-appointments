// Seed the MongoDB database with dummy data — run with `npm run seed`
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Pet from "./models/Pet.js";
import Service from "./models/Service.js";
import Appointment from "./models/Appointment.js";

const SERVICES = [
  { name: "Veterinary Consultation", description: "Comprehensive health check-ups by certified vets.", icon: "Stethoscope", duration: "30 min", price: "$45" },
  { name: "Grooming", description: "Bath, haircut, nail trim, ear cleaning.", icon: "Scissors", duration: "60 min", price: "$35" },
  { name: "Vaccination", description: "Personalized vaccination schedule.", icon: "Syringe", duration: "20 min", price: "$30" },
  { name: "Training", description: "Positive-reinforcement behavior training.", icon: "GraduationCap", duration: "45 min", price: "$40" },
  { name: "Day Care", description: "Safe, social, supervised daycare.", icon: "Home", duration: "1 day", price: "$25" },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Clearing collections…");
  await Promise.all([User.deleteMany({}), Pet.deleteMany({}), Service.deleteMany({}), Appointment.deleteMany({})]);

  const services = await Service.insertMany(SERVICES);

  const [admin, demo, priya] = await User.insertMany([
    { name: "Admin",        email: "admin@pawpal.com", password: await bcrypt.hash("admin123", 10), role: "admin" },
    { name: "Alex Morgan",  email: "demo@pawpal.com",  password: await bcrypt.hash("demo123", 10),  phone: "+1 555 010 4242", address: "742 Evergreen Terrace" },
    { name: "Priya Patel",  email: "priya@example.com",password: await bcrypt.hash("password", 10) },
  ]);

  const pets = await Pet.insertMany([
    { userId: demo._id,  name: "Luna",  species: "Dog", breed: "Golden Retriever",   age: 3, gender: "Female", vaccinated: true },
    { userId: demo._id,  name: "Milo",  species: "Cat", breed: "British Shorthair",  age: 2, gender: "Male",   vaccinated: true },
    { userId: demo._id,  name: "Coco",  species: "Dog", breed: "French Bulldog",     age: 1, gender: "Female", vaccinated: false },
    { userId: priya._id, name: "Simba", species: "Cat", breed: "Maine Coon",         age: 4, gender: "Male",   vaccinated: true },
  ]);

  const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

  await Appointment.insertMany([
    { userId: demo._id, petId: pets[0]._id, serviceId: services[0]._id, date: inDays(2),  time: "10:00", status: "Upcoming" },
    { userId: demo._id, petId: pets[1]._id, serviceId: services[1]._id, date: inDays(5),  time: "14:30", status: "Upcoming" },
    { userId: demo._id, petId: pets[2]._id, serviceId: services[2]._id, date: inDays(-4), time: "09:00", status: "Completed" },
  ]);

  console.log("✅ Seed complete.");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
