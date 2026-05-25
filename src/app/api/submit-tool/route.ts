import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  website: z.string().url(),
  description: z.string().min(20),
  category: z.string().min(1),
  pricing: z.string(),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    console.log("[Submit Tool]", data);
    return NextResponse.json({ message: "Submission received. We'll review it shortly." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid submission data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
