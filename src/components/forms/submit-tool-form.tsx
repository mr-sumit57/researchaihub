"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/categories";

export function SubmitToolForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/submit-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <Input name="name" placeholder="Tool name" required />
      <Input name="website" type="url" placeholder="https://..." required />
      <Textarea name="description" placeholder="Description (min 20 chars)" rows={4} required minLength={20} />
      <select name="category" required className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
      <select name="pricing" required className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
        <option value="free">Free</option>
        <option value="freemium">Freemium</option>
        <option value="paid">Paid</option>
        <option value="enterprise">Enterprise</option>
      </select>
      <Input name="email" type="email" placeholder="Your email" required />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Tool"}
      </Button>
      {status === "success" && <p className="text-sm text-emerald-600">Submission received. We&apos;ll review shortly.</p>}
      {status === "error" && <p className="text-sm text-destructive">Submission failed. Please try again.</p>}
    </form>
  );
}
