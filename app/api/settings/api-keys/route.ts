import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateApiKey } from "@/lib/api-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        lastUsed: true,
        createdAt: true,
        truncatedKey: true,
      },
    });

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error("[API_KEYS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const { key, keyHash, truncatedKey } = generateApiKey();

    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        keyHash,
        truncatedKey,
        userId: session.user.id,
      },
    });

    // Return the key ONLY once
    return NextResponse.json({ ...apiKey, key });
  } catch (error) {
    console.error("[API_KEYS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return new NextResponse("ID is required", { status: 400 });
    }

    // Ensure the key belongs to the user
    const existingKey = await prisma.apiKey.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingKey) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { key, keyHash, truncatedKey } = generateApiKey();

    const updatedKey = await prisma.apiKey.update({
      where: { id },
      data: {
        keyHash,
        truncatedKey,
        lastUsed: null, 
      },
    });

    return NextResponse.json({ ...updatedKey, key });
  } catch (error) {
    console.error("[API_KEYS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID is required", { status: 400 });
    }

    // Ensure the key belongs to the user
    const apiKey = await prisma.apiKey.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!apiKey) {
      return new NextResponse("Not found", { status: 404 });
    }

    await prisma.apiKey.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[API_KEYS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
