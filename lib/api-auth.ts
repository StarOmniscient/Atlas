import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function validateApiKey(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }


  const key = authHeader.split(" ")[1];
  // Hash the key to compare with stored hash
  const keyHash = crypto.createHash("sha256").update(key).digest("hex");

  const apiKey = await prisma.apiKey.findUnique({
    where: { keyHash },
    include: { user: true },
  });

  if (!apiKey) {
    return null;
  }

  // Update last used asynchronously
  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsed: new Date() },
  });

  return apiKey.user;
}

export function generateApiKey() {
  // Generate a random key
  const prefix = process.env.npm_package_name || "runerra";
  const randomPart = crypto.randomBytes(24).toString("hex");
  const key = `${prefix}_${randomPart}`;
  const keyHash = crypto.createHash("sha256").update(key).digest("hex");
  const truncatedKey = `${prefix}_...${randomPart.slice(-4)}`;
  return { key, keyHash, truncatedKey };
}
