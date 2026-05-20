import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin login — RIDA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 pt-36 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Studio</p>
        <h1 className="text-3xl font-semibold mb-2">
          <span className="text-gradient-gold">
            {mode === "signin" ? "Sign in" : "Create account"}
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          First account created becomes the studio admin.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md bg-input/40 border border-border px-3 py-2 text-foreground focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-input/40 border border-border px-3 py-2 text-foreground focus:border-primary outline-none"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="hover-shimmer w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold disabled:opacity-60"
          >
            {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {mode === "signin" ? "Need an account? Create one" : "Already have one? Sign in"}
        </button>
        <div className="mt-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to site</Link>
        </div>
      </motion.div>
    </section>
  );
}
