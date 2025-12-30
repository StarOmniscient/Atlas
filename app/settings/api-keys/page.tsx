import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ApiKeysSettings } from "@/components/settings/ApiKeysSettings";

export default async function DeveloperSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Developer Settings</h1>
        <p className="text-muted-foreground">
          Manage your API access and developer tools.
        </p>
      </div>
      <ApiKeysSettings />
    </div>
  );
}
