// app/api/prayer/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// 📥 GET: Public fetch (only approved requests)
export async function GET() {
  try {
    const prayers = await prisma.prayerRequest.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(prayers)
  } catch (err) {
    console.error("Error fetching prayers:", err)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

// 📝 POST: Create new request (members only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to submit a prayer request." },
      { status: 401 }
    )
  }

  if (session.user.role === "ADMIN") {
    return NextResponse.json(
      { error: "Admins cannot submit prayer requests." },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()

    const prayer = await prisma.prayerRequest.create({
      data: {
        name: session.user.name ?? "Anonymous", // from session
        request: body.request,
        anonymous: body.anonymous ?? false,
        approved: false, // ✅ default: hidden until admin approves
      },
    })

    return NextResponse.json(prayer, { status: 201 })
  } catch (err) {
    console.error("Error creating prayer request:", err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
