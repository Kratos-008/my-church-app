// app/api/admin/prayers/[id]/approve/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'

type Params = {
  params: { id: string }
}

export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions)

  // 🚫 Require login + admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const prayer = await prisma.prayerRequest.findUnique({
    where: { id: params.id },
  })

  if (!prayer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.prayerRequest.update({
    where: { id: params.id },
    data: { approved: !prayer.approved },
  })

  // ✅ Redirect back so admin table updates
  return NextResponse.redirect(new URL("/admin/prayers", req.url))
}
