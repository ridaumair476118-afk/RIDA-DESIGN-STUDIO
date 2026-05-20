import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "../components/PageShell";
import { TiltCard } from "../components/TiltCard";
import { Reveal } from "../components/Reveal";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — RIDA Design Studio" },
      { name: "description", content: "Selected work and case studies." },
    ],
  }),
  component: Projects,
});

type Project = {
  id: string;
  title: string;
  tag: string;
  description: string;
  image_url: string | null;
};

const fallback: Project[] = [
  {
    id: "1",
    title: "Choco Brew Colombia",
    tag: "Branding · 2025",
    description:
      "Visual identity and packaging for a Colombian craft chocolate and coffee brand rooted in origin storytelling.",
    image_url: null,
  },
  {
    id: "2",
    title: "Pixel Perfect Production",
    tag: "Web · 2025",
    description:
      "Front-end build for a creative production studio — responsive, typographic, and obsessed with details.",
    image_url: null,
  },
];

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select("id, title, tag, description, image_url")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setProjects(data && data.length > 0 ? (data as Project[]) : fallback);
      setLoaded(true);
    })();
  }, []);

  return (
    <PageShell
      eyebrow="Projects"
      title="Selected work."
      intro="A small but considered set of recent collaborations."
    >
      <ul className="grid gap-6 sm:grid-cols-2" style={{ perspective: 1200 }}>
        {(loaded ? projects : fallback).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <TiltCard className="relative rounded-2xl border border-border bg-card overflow-hidden cursor-pointer group">
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="p-8">
                <span className="text-xs tracking-[0.25em] uppercase text-primary">{p.tag}</span>
                <h2 className="mt-4 text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{p.description}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}
