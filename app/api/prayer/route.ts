import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const prayer = await prisma.prayerRequest.create({
    data: { name, email, message },
  });

  return NextResponse.json(prayer, { status: 201 });
}
