// /app/api/admin/events/[id]/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

// GET - Fetch single event by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("[GET_EVENT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PUT - Update event
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, date, location, description, image } = body;

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        title,
        date: new Date(date),
        location,
        description,
        image,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("[UPDATE_EVENT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Remove event
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("[DELETE_EVENT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}