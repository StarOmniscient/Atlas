import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; 

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        // find user by email OR username
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          },
        });

        if (!user) {
          throw new Error("No user found with that email or username");
        }

        // verify password
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // return user object for JWT
        return {
          id: user.id,
          username: user.username, // map db username to user.username
          displayName: user.displayName, 
          email: user.email,
          avatarUrl: user.avatarUrl, // map db avatarUrl to user.avatarUrl
          role: user.role,
          passwordChangedAt: user.passwordChangedAt
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        // Handle session updates (e.g. from client side update())
        if (session.displayName) token.displayName = session.displayName;
        if (session.avatarUrl || session.avatarUrl === null) token.avatarUrl = session.avatarUrl;
        if (session.username) token.username = session.username;
        if (session.email) token.email = session.email;
      }
      
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.displayName = user.displayName;
        token.avatarUrl = user.avatarUrl;
        token.role = user.role;
        // Store passwordChangedAt timestamp
        token.passwordChangedAt = user.passwordChangedAt ? Math.floor(user.passwordChangedAt.getTime() / 1000) : null;
      }

      // Check if password has changed since token issue
      if (token.passwordChangedAt && token.iat) {
        // Allow for a small clock drift or processing delay (e.g. 1 second)
        // If token issued BEFORE password change, it's invalid
        if (token.iat < token.passwordChangedAt) {
           return Promise.reject(new Error("Token expired due to password change"));
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username;
        session.user.displayName = token.displayName as string | null;
        session.user.avatarUrl = token.avatarUrl as string | null;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
