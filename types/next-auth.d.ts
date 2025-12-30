import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      displayName: string | null;
      email: string;
      avatarUrl: string | null;
      role: string;
    }
  }

  interface User {
    id: string;
    username: string | null;
    displayName: string | null;
    email: string;
    avatarUrl: string | null;
    role: string;
    passwordChangedAt?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    displayName: string | null;
    email: string;
    avatarUrl: string | null;
    role: string;
    iat: number;
    passwordChangedAt?: number | null; // stored as timestamp
  }
}

