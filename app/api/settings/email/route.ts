import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Check uniqueness
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== session.user.id) {
       return new NextResponse("Email already taken", { status: 409 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { email },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[SETTINGS_EMAIL_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
