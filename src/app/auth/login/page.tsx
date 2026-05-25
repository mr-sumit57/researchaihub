"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setMessage("Configure Supabase in .env.local to enable authentication.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage("Check your email for the magic link.");
  }

  return (
    <div className="container mx-auto flex max-w-md flex-col items-center px-4 py-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in to ResearchAIHub</CardTitle>
          <p className="text-sm text-muted-foreground">Save bookmarks and manage your profile.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLink} className="space-y-4">
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
          {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
          <p className="mt-4 text-center text-sm">
            <Link href="/" className="text-primary hover:underline">
              Back to home
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
