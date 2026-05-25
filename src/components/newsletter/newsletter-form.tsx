"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterFormProps {
  variant?: "inline" | "card";
  className?: string;
}

export function NewsletterForm({ variant = "inline" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      setStatus("success");
      setMessage("You're subscribed! Check your inbox.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-electric/5 p-8">
        <div className="flex items-center gap-2 text-primary">
          <Mail className="h-5 w-5" />
          <span className="font-semibold">Weekly AI Tools Digest</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Get trending tools, research tips, and exclusive comparisons every week.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
          </Button>
        </form>
        {message && (
          <p className={`mt-2 text-sm ${status === "success" ? "text-emerald-600" : "text-destructive"}`}>{message}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:max-w-md">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </Button>
      {message && <p className="text-sm text-muted-foreground sm:col-span-2">{message}</p>}
    </form>
  );
}
