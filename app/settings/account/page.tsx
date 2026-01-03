import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AccountSettingsForm } from "@/components/settings/AccountSettingsForm";

export default async function AccountSettingsPage() {
  const session = await auth();

  if (!session?.user?.username) {
    console.log("No name found in session");
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
    select: {
      id: true,
      email: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      private: true,
      status: true,
    },
  });

  if (!user) {
    // Handle edge case where session exists but user in DB is gone
    console.log("No user found in DB");
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and profile.
        </p>
      </div>
      <AccountSettingsForm user={user} />
    </div>
  );
}
