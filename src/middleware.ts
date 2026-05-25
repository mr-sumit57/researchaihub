import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Supabase auth refresh when configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { updateSession } = await import("@/lib/supabase/middleware");
      return await updateSession(request);
    } catch {
      // Continue without auth if middleware fails
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
