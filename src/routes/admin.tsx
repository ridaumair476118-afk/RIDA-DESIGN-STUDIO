import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Upload, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — RIDA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Project = {
  id: string;
  title: string;
  tag: string;
  description: string;
  image_url: string | null;
  sort_order: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setUserEmail(data.session.user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id);
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
      await loadProjects();
      setReady(true);
    })();
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const loadProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setProjects((data as Project[]) ?? []);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let image_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("project-images")
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        image_url = supabase.storage.from("project-images").getPublicUrl(path).data.publicUrl;
      }
      const { data: user } = await supabase.auth.getUser();
      const { error: insErr } = await supabase.from("projects").insert({
        title,
        tag,
        description,
        image_url,
        owner_id: user.user?.id,
      });
      if (insErr) throw insErr;
      setTitle("");
      setTag("");
      setDescription("");
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value &&
        ((document.getElementById("file-input") as HTMLInputElement).value = "");
      await loadProjects();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (p: Project) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    await supabase.from("projects").delete().eq("id", p.id);
    if (p.image_url) {
      const path = p.image_url.split("/project-images/")[1];
      if (path) await supabase.storage.from("project-images").remove([path]);
    }
    await loadProjects();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  if (!ready) {
    return (
      <section className="mx-auto max-w-5xl px-6 pt-36">
        <p className="text-muted-foreground">Loading…</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-md px-6 pt-36 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">
            <span className="text-gradient-gold">Not an admin</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            You're signed in as {userEmail}, but your account doesn't have admin permission.
          </p>
          <button
            onClick={signOut}
            className="rounded-full border border-border px-5 py-2 text-sm hover:border-primary"
          >
            Sign out
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-24 animate-page-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Admin</p>
          <h1 className="text-4xl font-semibold">
            <span className="text-gradient-gold">Manage your work</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Signed in as {userEmail}</p>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-border bg-card p-8 grid gap-4 mb-12"
      >
        <h2 className="text-xl font-semibold">Add a project</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md bg-input/40 border border-border px-3 py-2 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Tag</label>
            <input
              placeholder="Branding · 2026"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="mt-1 w-full rounded-md bg-input/40 border border-border px-3 py-2 focus:border-primary outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-md bg-input/40 border border-border px-3 py-2 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Cover image</label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="hover-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold disabled:opacity-60 w-fit"
        >
          <Upload className="size-4" /> {submitting ? "Uploading…" : "Publish project"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Your projects ({projects.length})</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              {p.image_url && (
                <img src={p.image_url} alt={p.title} className="w-full aspect-[16/10] object-cover" />
              )}
              <div className="p-5">
                <span className="text-xs tracking-[0.2em] uppercase text-primary">{p.tag}</span>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <button
                  onClick={() => remove(p)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="mt-10 text-xs text-muted-foreground">
        <Link to="/projects" className="hover:text-primary">View public projects page →</Link>
      </p>
    </section>
  );
}
