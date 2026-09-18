import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const installationId = req.nextUrl.searchParams.get("installation_id");

  if (!installationId) {
    return NextResponse.redirect(
      new URL("/dashboard?error=missing_installation", req.url),
    );
  }

  try {
    // Fetch the GitHub login for this installation so we have a human-readable
    // record (not strictly required, but useful for the dashboard UI later).
    // For now, we don't have server-side Octokit access from the dashboard,
    // so we'll just pass a placeholder and let the server enrich it later if needed.
    const res = await fetch(`${SERVER_URL}/api/installations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkUserId: userId,
        installationId: Number(installationId),
      }),
    });

    if (!res.ok) {
      console.error("Failed to register installation:", await res.text());
      return NextResponse.redirect(
        new URL("/dashboard?error=registration_failed", req.url),
      );
    }
  } catch (err) {
    console.error("Error calling server:", err);
    return NextResponse.redirect(
      new URL("/dashboard?error=server_unreachable", req.url),
    );
  }

  return NextResponse.redirect(new URL("/dashboard?connected=true", req.url));
}
