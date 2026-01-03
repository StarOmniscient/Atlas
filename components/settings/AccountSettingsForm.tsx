"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  StarCard as Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/StarCard";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useSession, signOut } from "next-auth/react";
import { useAlert } from "@/context/AlertContext";

interface UserData {
  id: string;
  email: string;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  private: boolean;
  status: string | null;
}

export function AccountSettingsForm({ user }: { user: UserData }) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  // Avatar State
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarMode, setAvatarMode] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [username, setUsername] = useState(user.username || "");
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [statusText, setStatusText] = useState(user.status || "");

  // Email State
  const [email, setEmail] = useState(user.email || "");

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Privacy State
  const [isPrivate, setIsPrivate] = useState(user.private);
  const [privacyLoading, setPrivacyLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Sync state with session if needed
  useEffect(() => {
    if (session?.user) {
      if (session.user.avatarUrl && session.user.avatarUrl !== avatarUrl)
        setAvatarUrl(session.user.avatarUrl);
      if (session.user.displayName && session.user.displayName !== displayName)
        setDisplayName(session.user.displayName);
      if (session.user.email && session.user.email !== email)
        setEmail(session.user.email);
    }
  }, [session]);

  const handleAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (avatarMode === "file" && avatarFile) {
        formData.append("file", avatarFile);
      } else if (avatarMode === "url") {
        formData.append("url", avatarUrl);
      } else {
        return; // Nothing to update
      }

      const res = await fetch("/api/settings/avatar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update avatar");
      const updatedUser = await res.json();
      await update({ image: updatedUser.avatarUrl }); // Update session

      router.refresh();
      showAlert({
        type: "success",
        title: "Avatar Updated",
        message: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: "Failed to update your avatar. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      await update({ displayName }); // Update session

      router.refresh();
      showAlert({
        type: "success",
        title: "Profile Updated",
        message: "Your public profile information has been saved.",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: (error as Error).message || "Failed to update your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusText }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      router.refresh();
      showAlert({
        type: "success",
        title: "Status Updated",
        message: "Your status has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: (error as Error).message || "Failed to update your status.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings/email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      await update({ email }); // Update session

      router.refresh();
      showAlert({
        type: "success",
        title: "Email Updated",
        message: "Your email address has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Update Failed",
        message: (error as Error).message || "Failed to update your email.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showAlert({
        type: "warning",
        title: "Password Mismatch",
        message: "The new password and confirmation do not match.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
      setCurrentPassword("");
      setNewPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showAlert({
        type: "success",
        title: "Password Changed",
        message:
          "Your password has been changed successfully. You will be signed out.",
      });
      setTimeout(() => signOut(), 2000);
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Change Failed",
        message: (error as Error).message || "Failed to change password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyChange = async (checked: boolean) => {
    setPrivacyLoading(true);
    try {
      const res = await fetch("/api/settings/privacy", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPrivate: checked }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
      setIsPrivate(checked);
      router.refresh();
      showAlert({
        type: "info",
        title: "Privacy Updated",
        message: `Your account is now ${checked ? "private" : "public"}.`,
      });
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Update Failed",
        message:
          (error as Error).message || "Failed to update privacy settings.",
      });
    } finally {
      setPrivacyLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-8">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>Change your profile picture.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAvatarSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={session?.user?.avatarUrl || user.avatarUrl || undefined}
                />
                <AvatarFallback>
                  {user.username?.substring(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={avatarMode === "file" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAvatarMode("file")}
                  >
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant={avatarMode === "url" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAvatarMode("url")}
                  >
                    Image URL
                  </Button>
                </div>

                {avatarMode === "file" ? (
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="avatar-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-fit bg-secondary text-secondary-foreground"
                    >
                      Choose File
                    </Label>
                    <Input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) =>
                        setAvatarFile(e.target.files?.[0] || null)
                      }
                    />
                    {avatarFile ? (
                      <span className="text-sm text-muted-foreground">
                        Selected: {avatarFile.name}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        No file selected
                      </span>
                    )}
                  </div>
                ) : (
                  <Input
                    placeholder="https://example.com/avatar.png"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="max-w-md h-8"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                size="sm"
                className="h-8"
              >
                Save Avatar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleProfileSubmit} className="flex items-end gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
                className="max-w-md h-8"
              />
            </div>
            <Button type="submit" disabled={loading} size="sm" className="h-8">
              Save Profile
            </Button>
          </form>

          <Separator className="bg-white/5" />

          <div className="space-y-4">
            <form
              onSubmit={handleStatusSubmit}
              className="flex items-end gap-4"
            >
              <div className="space-y-2 flex-1">
                <Label htmlFor="statusText">Status Message</Label>
                <Input
                  id="statusText"
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                  placeholder="What's on your mind?"
                  className="max-w-md h-8"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                size="sm"
                className="h-8"
              >
                Save Status
              </Button>
            </form>
            <p className="text-xs text-muted-foreground -mt-2">
              This message will be shown on your public profile card.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Email Section */}
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Update your email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="flex items-end gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="max-w-md h-8"
              />
            </div>
            <Button type="submit" disabled={loading} size="sm" className="h-8">
              Update Email
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="max-w-md h-8"
              />
            </div>
            <Separator className="max-w-md my-4" />
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="max-w-md h-8"
              />
            </div>
            <div className="flex items-end gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="max-w-md h-8"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                size="sm"
                className="h-8"
              >
                Change Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Privacy Section */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="private-mode">Private Account</Label>
              <p className="text-sm text-muted-foreground">
                When enabled, noone will be able to see your profile.
              </p>
            </div>
            <Switch
              id="private-mode"
              checked={isPrivate}
              onCheckedChange={handlePrivacyChange}
              disabled={privacyLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
