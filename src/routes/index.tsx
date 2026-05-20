import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/rida-logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import workFb from "@/assets/work-fb.jpg";
import workFlyer from "@/assets/work-flyer.jpg";
import workPhoto from "@/assets/work-photo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rida — Graphic Design & Front-End Development" },
      { name: "description", content: "Portfolio of Rida — graphic designer and front-end developer crafting bold visual identities and immersive web experiences." },
      { property: "og:title", content: "Rida — Where Creativity Meets Innovation" },
      { property: "og:description", content: "Graphic design and front-end development portfolio." },
    ],
  }),
  component: Index,
});

const works = [
  { img: workFb, title: "Facebook Cover", category: "Social Media Design", year: "2025" },
  { img: workFlyer, title: "Flyer", category: "Print Design", year: "2025" },
  { img: workPhoto, title: "Photo Manipulation", category: "Photoshop", year: "2025" },
  { img: work1, title: "Choco Brew", category: "Brand Identity · Coming Soon", year: "2025" },
  { img: work2, title: "Pixel Perfect Production", category: "Web Development · Coming Soon", year: "2025" },
  { img: work3, title: "Onyx Stationery", category: "Print & Brand", year: "2024" },
  { img: work4, title: "Fragment Series", category: "Poster Design", year: "2024" },
];

const services = [
  { n: "01", t: "Brand Identity", d: "Logos, visual systems, and guidelines that articulate a singular voice." },
  { n: "02", t: "Web Design", d: "Editorial interfaces composed with intent — every pixel deliberate." },
  { n: "03", t: "Front-End Dev", d: "React, TypeScript, and motion — performant code that feels alive." },
  { n: "04", t: "Art Direction", d: "Creative direction across campaigns, editorial, and digital products." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-32 pb-20">
        <img src={heroBg} alt="" width={1536} height={1024} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 animate-fade-up">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6">— Portfolio · 2025</p>
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-display font-black tracking-tight uppercase">
              <span className="text-gold-gradient font-black">RIDA</span><br />
              <em className="not-italic font-black">DESIGN STUDIO</em>
            </h1>
            <p className="mt-10 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Graphic Designer &amp; Front-end Developer specialized in <span className="text-gold">branding</span> and <span className="text-gold">digital experiences</span>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#work" className="group inline-flex items-center gap-3 bg-gold-gradient text-primary-foreground px-8 py-4 rounded-full font-medium tracking-wide shadow-[var(--shadow-gold)] hover:scale-[1.02] transition-transform">
                View Selected Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-gold transition-colors">
                Start a project
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 relative animate-float">
            <img src={logo} alt="" className="w-full max-w-sm mx-auto rounded-3xl shadow-[var(--shadow-deep)] ring-1 ring-gold/20" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-muted-foreground flex flex-col items-center gap-3">
          <span>Scroll</span>
          <span className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border py-8 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap text-4xl md:text-6xl font-display italic marquee">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              <span>Branding</span><span>·</span>
              <span>Web Design</span><span>·</span>
              <span>Front-End</span><span>·</span>
              <span>Art Direction</span><span>·</span>
              <span>Motion</span><span>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">— Selected Work</p>
            <h2 className="text-5xl md:text-7xl font-display font-light">Recent <em className="text-gold-gradient not-italic">projects</em>.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">A curated selection of work spanning visual identity, web interfaces, and editorial design.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {works.map((w, i) => (
            <article key={w.title} className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}>
              <div className="relative overflow-hidden rounded-2xl bg-card aspect-[4/5]">
                <img src={w.img} alt={w.title} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">{w.category}</p>
                    <h3 className="text-3xl font-display">{w.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">{w.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
          <div className="grid md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-5">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">— Services</p>
              <h2 className="text-5xl md:text-7xl font-display font-light leading-none">A studio of <em className="text-gold-gradient not-italic">one</em>.</h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-lg text-muted-foreground leading-relaxed self-end">
              Versatile end-to-end practice — I bridge the gap between design language and shipped product, so the vision you brief is the experience that ships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {services.map((s) => (
              <div key={s.n} className="bg-background p-10 md:p-14 group hover:bg-card transition-colors">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{s.n}</span>
                  <span className="text-gold text-2xl group-hover:rotate-45 transition-transform duration-500">+</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display mb-4">{s.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full" />
            <img src={logo} alt="Rida" className="relative w-full rounded-3xl ring-1 ring-gold/30 shadow-[var(--shadow-deep)]" />
          </div>
          <div className="md:col-span-7 md:pl-12">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">— About</p>
            <h2 className="text-5xl md:text-6xl font-display font-light mb-8 leading-tight">
              Half <em className="text-gold-gradient not-italic">designer</em>,<br />half <em className="italic">developer</em>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I move fluidly between Figma and the editor. My practice is rooted in editorial design, typography, and the conviction that interfaces deserve the same craft as a printed page.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              From identity systems to production-ready React applications — I deliver work that's considered, performant, and unmistakably itself.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[["50+", "Projects"], ["6yrs", "Experience"], ["∞", "Curiosity"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl md:text-4xl font-display text-gold-gradient">{n}</div>
                  <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden border-t border-border">
        <img src={heroBg} alt="" loading="lazy" width={1536} height={1024} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-48 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6">— Let's Collaborate</p>
          <h2 className="text-6xl md:text-9xl font-display font-light leading-[0.9] mb-12">
            Have an <em className="text-gold-gradient not-italic">idea</em>?<br />Let's build it.
          </h2>
          <a href="mailto:hello@rida.studio" className="inline-block text-2xl md:text-4xl font-display italic text-gold hover:underline underline-offset-8 decoration-gold/40">
            hello@rida.studio
          </a>
          <div className="mt-16 flex justify-center gap-8 text-sm tracking-widest uppercase text-muted-foreground">
            {["Instagram", "Behance", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="hover:text-gold transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-muted-foreground">
          <span>© 2025 Rida — All rights reserved</span>
          <span>Where creativity meets innovation</span>
        </div>
      </footer>
    </div>
  );
}
