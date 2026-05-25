import { NextResponse } from "next/server";

async function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

async function resolveToolId(supabase: Awaited<ReturnType<typeof getSupabase>>, toolIdOrLegacy: string) {
  if (!supabase) return null;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(toolIdOrLegacy)) return toolIdOrLegacy;

  const { data } = await supabase
    .from("tools")
    .select("id")
    .eq("legacy_id", toolIdOrLegacy)
    .maybeSingle();

  return data?.id ?? null;
}

export async function GET() {
  const supabase = await getSupabase();
  if (!supabase) {
    return NextResponse.json({ bookmarks: [], authenticated: false, configured: false });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ bookmarks: [], authenticated: false, configured: true });
  }

  const { data } = await supabase
    .from("bookmarks")
    .select("tool_id, tools(legacy_id)")
    .eq("user_id", user.id);

  const bookmarks = (data || []).map((b) => {
    const tools = b.tools as { legacy_id?: string } | null;
    return tools?.legacy_id || b.tool_id;
  });

  return NextResponse.json({ bookmarks, authenticated: true, configured: true });
}

export async function POST(request: Request) {
  const supabase = await getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { toolId } = await request.json();
  const resolvedId = await resolveToolId(supabase, toolId);
  if (!resolvedId) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  const { error } = await supabase
    .from("bookmarks")
    .insert({ user_id: user.id, tool_id: resolvedId });

  if (error?.code === "23505") return NextResponse.json({ bookmarked: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookmarked: true });
}

export async function DELETE(request: Request) {
  const supabase = await getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { toolId } = await request.json();
  const resolvedId = await resolveToolId(supabase, toolId);
  if (!resolvedId) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("tool_id", resolvedId);
  return NextResponse.json({ bookmarked: false });
}
