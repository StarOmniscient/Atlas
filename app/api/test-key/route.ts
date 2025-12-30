import { validateApiKey } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await validateApiKey(req);


  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized: Invalid or missing API Key" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.json({
    message: "Authenticated successfully via API Key",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    timestamp: new Date().toISOString(),
  });
}
