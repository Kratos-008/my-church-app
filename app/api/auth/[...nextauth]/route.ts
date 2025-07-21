import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import prisma from "@/lib/prisma"

// Extend the session with custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: "ADMIN" | "USER"
    }
  }
  interface User {
    role: "ADMIN" | "USER"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    role: "ADMIN" | "USER"
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },
  pages: {
    signIn: "/auth/signin", // Custom login page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role as "ADMIN" | "USER"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.role = token.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions)

export { handler as GET, handler as POST }