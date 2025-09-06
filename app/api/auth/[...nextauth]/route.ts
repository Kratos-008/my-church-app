import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import type { AuthOptions } from "next-auth"

// Extend session and JWT types
// Extend session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null   // ✅ add this
      email: string
      role: "ADMIN" | "USER"
    }
  }

  interface User {
    id: string
    name?: string | null
    email: string
    role: "ADMIN" | "USER"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string | null   // ✅ add this
    email: string
    role: "ADMIN" | "USER"
  }
}

// ✅ Auth config
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user || !user.password) return null

          const isValid = await compare(credentials.password, user.password)
          if (!isValid) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id
      token.name = user.name ?? null   // ✅ add name here
      token.email = user.email
      token.role = user.role as "ADMIN" | "USER"
    }
    return token
  },
  async session({ session, token }) {
    if (session.user && token) {
      session.user.id = token.id as string
      session.user.name = token.name as string | null   // ✅ add name here
      session.user.email = token.email as string
      session.user.role = token.role as "ADMIN" | "USER"
    }
    return session
  },
},
  secret: process.env.NEXTAUTH_SECRET,
}

// ✅ Required Next.js API route export
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
