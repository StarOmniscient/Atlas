import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const url = formData.get("url") as string | null;

    if (!file && !url) {
      return new NextResponse("No file or URL provided", { status: 400 });
    }

    let avatarUrl = url;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Ensure directory exists
      const uploadDir = join(process.cwd(), "public", "avatars");
      await mkdir(uploadDir, { recursive: true });

      // Create unique filename
      const ext = path.extname(file.name) || ".png";
      const filename = `${session.user.id}-${Date.now()}${ext}`;
      const filepath = join(uploadDir, filename);

      await writeFile(filepath, buffer);
      avatarUrl = `/avatars/${filename}`;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { avatarUrl: avatarUrl },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[SETTINGS_AVATAR_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
