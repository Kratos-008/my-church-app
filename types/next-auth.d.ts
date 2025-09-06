import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: "ADMIN" | "USER"
    }
  }

  interface User {
    id: string
    name?: string | null   // ✅ add this
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
