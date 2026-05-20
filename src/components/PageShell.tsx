import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-5xl px-6 lg:px-10 pt-32 pb-24"
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">{eyebrow}</p>
      )}
      <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
        <span className="text-gradient-gold-animated">{title}</span>
      </h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{intro}</p>
      )}
      {children && <div className="mt-14">{children}</div>}
    </motion.section>
  );
}
