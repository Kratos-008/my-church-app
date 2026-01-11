// /app/api/admin/events/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Ensure dynamic server execution for deployment
export const dynamic = "force-dynamic";

// Type for POST request body
type EventBody = {
  title: string;
  description: string;
  date: string; // ISO date string
  time: string;
  location: string;
};

// ✅ GET - List all events (Admin only)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Use URL API to safely get query params
    const url = new URL(req.url);
    const filter = url.searchParams.get("filter"); // Example: ?filter=upcoming

    let events;
    if (filter === "upcoming") {
      events = await prisma.event.findMany({
        where: { date: { gte: new Date() } },
        orderBy: { date: "asc" },
      });
    } else {
      events = await prisma.event.findMany({
        orderBy: { date: "asc" },
      });
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("[GET_EVENTS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// ✅ POST - Create new event (Admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, date, time, location }: EventBody = await req.json();

    // Validate required fields
    if (!title || !description || !date || !time || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate date format
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        time,
        date: eventDate,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[CREATE_EVENT_ERROR]", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
