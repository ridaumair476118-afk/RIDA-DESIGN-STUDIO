import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurum" },
      { name: "description", content: "Start a conversation." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let's build something rare."
      intro="Available for select engagements. Tell me about your project and I'll respond within two business days."
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-5 max-w-xl"
      >
        <div className="grid gap-2">
          <label className="text-xs tracking-[0.25em] uppercase text-primary">Name</label>
          <input
            type="text"
            className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs tracking-[0.25em] uppercase text-primary">Email</label>
          <input
            type="email"
            className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="you@studio.com"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs tracking-[0.25em] uppercase text-primary">Message</label>
          <textarea
            rows={5}
            className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            placeholder="Tell me about your project…"
          />
        </div>
        <button
          type="submit"
          className="hover-shimmer justify-self-start rounded-full bg-primary px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-gold"
        >
          Send message
        </button>
      </form>
    </PageShell>
  );
}
