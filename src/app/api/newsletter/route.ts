import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
      if (error?.code === "23505") {
        return NextResponse.json({ message: "Already subscribed" });
      }
      if (error) throw error;
    }

    // Fallback: log when Supabase not configured (dev mode)
    console.log("[Newsletter]", email);

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
