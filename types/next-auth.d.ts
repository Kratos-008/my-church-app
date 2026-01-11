// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
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
    name?: string | null
    email: string
    role: "ADMIN" | "USER"
  }
}
