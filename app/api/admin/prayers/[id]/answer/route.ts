// app/api/admin/prayers/[id]/answer/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'


type Params = {
  params: {
    id: string
  }
}

// ✅ POST: mark a prayer request as answered
export async function POST(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)

    // 🚫 Require login + admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    await prisma.prayerRequest.update({
      where: { id },
      data: { answered: true },
    })

    // ✅ redirect back to admin dashboard
    return NextResponse.redirect(new URL("/admin/prayers", req.url))
  } catch (error) {
    console.error("[ANSWER_PRAYER_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to mark as answered" },
      { status: 500 }
    )
  }
}
