// app/api/admin/prayers/[id]/delete/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'

export const dynamic = "force-dynamic"; // ✅ ensures runtime execution

type Params = {
  params: { id: string }
}

// ✅ POST: delete a prayer request
export async function POST(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)

    // 🚫 Require login + admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    await prisma.prayerRequest.delete({
      where: { id },
    })

    // ✅ Redirect back to admin dashboard
    return NextResponse.redirect(new URL("/admin/prayers", req.url))
  } catch (error) {
    console.error("[DELETE_PRAYER_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to delete prayer request" },
      { status: 500 }
    )
  }
}
