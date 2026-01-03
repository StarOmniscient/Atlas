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
    const { status } = body;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        status: status || null,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[SETTINGS_STATUS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
