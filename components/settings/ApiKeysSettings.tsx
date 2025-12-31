"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Trash2, Plus, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { StarCard, CardContent } from "@/components/ui/StarCard";
import { useAlert } from "@/context/AlertContext";
import { useConfirm } from "@/context/ConfirmContext";

interface ApiKey {
  id: string;
  name: string;
  lastUsed: string | null;
  createdAt: string;
  truncatedKey?: string;
}

export function ApiKeysSettings() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const { showAlert } = useAlert();
  const confirm = useConfirm();
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/settings/api-keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data);
      }
    } catch (error) {
      console.error("Failed to fetch keys", error);
      showAlert({
        type: "error",
        title: "Load Failed",
        message: "Could not load your API keys. Please refresh.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      const res = await fetch("/api/settings/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedKey(data.key);
        setKeys([data, ...keys]);
        setNewKeyName("");
        showAlert({
          type: "success",
          title: "Key Created",
          message: "Your new API key has been generated.",
        });
      }
    } catch (error) {
      console.error("Failed to create key", error);
      showAlert({
        type: "error",
        title: "Creation Failed",
        message: "Failed to generate a new API key.",
      });
    }
  };

  const handleRegenerateKey = async (id: string, name: string) => {
    const isConfirmed = await confirm({
      title: "Regenerate API Key",
      message: `Are you sure you want to regenerate the key for "${name}"? The old key will stop working immediately.`,
      confirmText: "Regenerate",
      variant: "destructive",
    });

    if (!isConfirmed) return;

    try {
      const res = await fetch("/api/settings/api-keys", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedKey(data.key);
        setNewKeyName(""); // Clear any previous name input
        setIsCreateOpen(true); // Open the dialog to show the key

        // Update the key in the list (mainly to reset lastUsed if needed)
        setKeys(keys.map((k) => (k.id === id ? { ...k, lastUsed: null } : k)));
        showAlert({
          type: "success",
          title: "Key Regenerated",
          message: `The key for "${name}" has been reset.`,
        });
      }
    } catch (error) {
      console.error("Failed to regenerate key", error);
      showAlert({
        type: "error",
        title: "Regeneration Failed",
        message: "Could not regenerate the API key.",
      });
    }
  };

  const handleDeleteKey = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Revoke API Key",
      message:
        "Are you sure you want to revoke this key? This action cannot be undone.",
      confirmText: "Revoke",
      variant: "destructive",
    });

    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/settings/api-keys?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setKeys(keys.filter((k) => k.id !== id));
        showAlert({
          type: "success",
          title: "Key Revoked",
          message: "The API key has been successfully deleted.",
        });
      }
    } catch (error) {
      console.error("Failed to delete key", error);
      showAlert({
        type: "error",
        title: "Revoke Failed",
        message: "Could not revoke the API key.",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showAlert({
      type: "success",
      message: "Copied to clipboard!",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">API Keys</h2>
          <p className="text-sm text-muted-foreground">
            Manage API keys for external applications.
          </p>
        </div>
        <Dialog
          open={isCreateOpen}
          onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) setCreatedKey(null); // Reset on close
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {createdKey ? "API Key Generated" : "Create API Key"}
              </DialogTitle>
              <DialogDescription>
                {createdKey
                  ? "Copy this key now. You won't be able to see it again!"
                  : "Enter a name for your new API key to verify it's purpose."}
              </DialogDescription>
            </DialogHeader>
            {!createdKey ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Production App"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                  Generate Key
                </Button>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="p-4 bg-muted rounded-md break-all relative group">
                  <code className="text-sm font-mono">{createdKey}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(createdKey)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setIsCreateOpen(false);
                      setCreatedKey(null);
                    }}
                  >
                    Done
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <p>Loading keys...</p>
        ) : keys.length === 0 ? (
          <p className="text-muted-foreground">No API keys created yet.</p>
        ) : (
          keys.map((key) => (
            <StarCard key={key.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h4 className="font-medium">{key.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Created: {format(new Date(key.createdAt), "PPP")} • Last
                    Used:{" "}
                    {key.lastUsed
                      ? format(new Date(key.lastUsed), "PPP")
                      : "Never"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {key.truncatedKey || `...${key.id.slice(-4)}`}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRegenerateKey(key.id, key.name)}
                    title="Regenerate Key"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteKey(key.id)}
                    title="Revoke Key"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </StarCard>
          ))
        )}
      </div>
    </div>
  );
}
