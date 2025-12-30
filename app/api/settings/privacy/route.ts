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
    const { isPrivate } = body;

    if (typeof isPrivate !== "boolean") {
      return new NextResponse("Invalid value for isPrivate", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        private: isPrivate,
      },
    });

    return NextResponse.json({ private: updatedUser.private });
  } catch (error) {
    console.error("[SETTINGS_PRIVACY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
