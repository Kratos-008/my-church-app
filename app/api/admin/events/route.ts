// /app/api/admin/events/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {prisma} from "@/lib/prisma";

// ✅ GET - List all events (Admin only)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("[GET_EVENTS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// ✅ POST - Create new event (Admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, date, time, location } = await req.json();

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        time,
        date: new Date(date),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[CREATE_EVENT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}