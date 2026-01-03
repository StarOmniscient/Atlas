"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarCard } from "@/components/ui/StarCard";
import Link from "next/link";
import { motion } from "framer-motion";

interface UserCardProps {
  id: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  status?: string | null;
}

export function UserCard({
  id,
  username,
  displayName,
  avatarUrl,
  status,
}: UserCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/user/${id}`}>
        <StarCard className="p-4 transition-colors cursor-pointer group">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border border-white/20 ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all shrink-0">
              <AvatarImage
                src={avatarUrl || ""}
                alt={username}
                className="object-cover"
              />
              <AvatarFallback className="bg-white/10 text-white/50">
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col overflow-hidden min-w-0">
              <span className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors leading-tight">
                {displayName || username}
              </span>
              <span className="text-sm text-white/40 truncate leading-tight">
                @{username}
              </span>

              {status && (
                <div className="mt-3 px-2 py-1 rounded-lg border border-dashed border-white/10 bg-white/5 text-[10px] text-white/60 truncate">
                  {status}
                </div>
              )}
            </div>
          </div>
        </StarCard>
      </Link>
    </motion.div>
  );
}
