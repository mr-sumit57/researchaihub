"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
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
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="message" placeholder="Message" rows={5} required />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
      </Button>
      {status === "success" && <p className="text-sm text-emerald-600">Message sent successfully.</p>}
      {status === "error" && <p className="text-sm text-destructive">Failed to send. Please try again.</p>}
    </form>
  );
}
