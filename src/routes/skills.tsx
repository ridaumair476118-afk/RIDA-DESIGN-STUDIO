import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/PageShell";
import { Palette, Image as ImageIcon, Code2, Paintbrush, Layout, Smartphone } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — RIDA Design Studio" },
      { name: "description", content: "Expertise across Adobe Illustrator, Photoshop, HTML, CSS and responsive layout." },
    ],
  }),
  component: Skills,
});

const expertise = [
  { name: "Adobe Illustrator", level: "Expert", Icon: Paintbrush, blurb: "Vector identity, logos & iconography" },
  { name: "Adobe Photoshop", level: "Expert", Icon: ImageIcon, blurb: "Retouching, compositing & art direction" },
  { name: "Adobe InDesign", level: "Advanced", Icon: Palette, blurb: "Editorial layout & print systems" },
  { name: "HTML", level: "Advanced", Icon: Code2, blurb: "Semantic, accessible markup" },
  { name: "CSS", level: "Advanced", Icon: Layout, blurb: "Modern layouts, Flexbox & Grid" },
  { name: "Responsive Layout", level: "Advanced", Icon: Smartphone, blurb: "Mobile-first, fluid across devices" },
];

function Skills() {
  return (
    <PageShell
      eyebrow="Skills"
      title="Expertise & toolkit."
      intro="A curated stack across design and development — chosen for clarity, craft, and longevity."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {expertise.map(({ name, level, Icon, blurb }) => (
          <div
            key={name}
            className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-gold transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5" />
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-primary/80">{level}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{blurb}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
