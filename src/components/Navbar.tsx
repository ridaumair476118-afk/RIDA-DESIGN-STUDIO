import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/rida-logo.jpg";

const baseLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setSignedIn(!!session)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const links = signedIn
    ? [...baseLinks, { to: "/admin", label: "Admin" } as const]
    : baseLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 font-display text-sm md:text-base lg:text-xl tracking-wide whitespace-nowrap shrink-0 logo-shimmer"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="RIDA logo"
            className="size-9 md:size-10 rounded-full object-cover ring-1 ring-primary/40 shadow-gold transition-transform duration-500 hover:rotate-[8deg] hover:scale-110"
          />
          <span className="text-gradient-gold-animated">RIDA DESIGN STUDIO</span>
        </Link>

        <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="px-2 lg:px-4 py-2 text-xs lg:text-sm tracking-wide uppercase transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        } bg-background/95 backdrop-blur-xl border-b border-border`}
      >
        <ul className="px-6 py-4 flex flex-col">
          {links.map((l, i) => (
            <li
              key={l.to}
              className="border-b border-border/40 last:border-0"
              style={{
                transform: open ? "translateY(0)" : "translateY(-8px)",
                opacity: open ? 1 : 0,
                transition: `all 300ms ease ${i * 60}ms`,
              }}
            >
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-foreground" }}
                className="block py-4 text-base tracking-wider uppercase"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
