import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aurum" },
      { name: "description", content: "About the designer and developer behind Aurum." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="About"
      title="Fashion, commerce & code."
      intro="A multi-disciplinary background spanning fashion, commerce, and computer science — bridging aesthetic sensibility, business intuition, and technical precision."
    >
      <div className="grid md:grid-cols-3 gap-8 text-muted-foreground leading-relaxed">
        <div>
          <h3 className="text-primary text-sm tracking-[0.25em] uppercase mb-3">Fashion</h3>
          <p>
            My journey began in fashion, where I learned to obsess over silhouette,
            texture, and the quiet language of detail — training that shapes every
            line, color, and proportion in my visual work.
          </p>
        </div>
        <div>
          <h3 className="text-primary text-sm tracking-[0.25em] uppercase mb-3">Commerce</h3>
          <p>
            Through commerce, I learned to read markets and audiences — connecting
            brand storytelling to real outcomes, and treating design as a strategic
            tool rather than decoration.
          </p>
        </div>
        <div>
          <h3 className="text-primary text-sm tracking-[0.25em] uppercase mb-3">Computer Science</h3>
          <p>
            Computer science gave me the tools to build what I imagine — translating
            brand vision into pixel-perfect, responsive, and accessible front-end
            experiences.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
