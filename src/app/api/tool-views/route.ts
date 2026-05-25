import { NextResponse } from "next/server";

async function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

async function resolveToolId(supabase: NonNullable<Awaited<ReturnType<typeof getSupabase>>>, toolId: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(toolId)) return toolId;
  const { data } = await supabase.from("tools").select("id").eq("legacy_id", toolId).maybeSingle();
  return data?.id ?? null;
}

export async function POST(request: Request) {
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.json({ ok: true });

  try {
    const { toolId, referrer } = await request.json();
    const resolvedId = await resolveToolId(supabase, toolId);
    if (!resolvedId) return NextResponse.json({ error: "Tool not found" }, { status: 404 });

    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("tool_views").insert({
      tool_id: resolvedId,
      user_id: user?.id ?? null,
      referrer: referrer || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
