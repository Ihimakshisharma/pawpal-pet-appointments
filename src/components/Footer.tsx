import { Link } from "@tanstack/react-router";
import { PawPrint, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-bg text-white">
              <PawPrint className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">Paw<span className="gradient-text">Pal</span></span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The delightful way to book pet care appointments — in seconds.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="/#features" className="hover:text-foreground">Features</a></li>
            <li><a href="/#services" className="hover:text-foreground">Services</a></li>
            <li><Link to="/register" className="hover:text-foreground">Book appointment</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="/#about" className="hover:text-foreground">About</a></li>
            <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
            <li><a href="/#contact" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Follow</h4>
          <div className="mt-3 flex gap-2">
            {[Github, Twitter, Instagram].map((I, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-secondary">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PawPal — Built with love for pets everywhere.
      </div>
    </footer>
  );
}
