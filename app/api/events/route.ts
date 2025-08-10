'use server'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 📜 GET events (public) with full filtering, pagination, search, month/year
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const past = searchParams.get('past') === 'true';
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const search = searchParams.get('search') || '';
    const month = parseInt(searchParams.get('month') || '0', 10);
    const year = parseInt(searchParams.get('year') || '0', 10);

    // ✅ Normalize to start of today
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Build base date filter
    let dateFilter: any = {};
    if (month >= 1 && month <= 12 && year > 0) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      if (past) {
        // Only past events in that month
        dateFilter = {
          gte: startOfMonth,
          lte: endOfMonth,
          lt: startOfToday,
        };
      } else {
        // Only upcoming events in that month
        dateFilter = {
          gte: startOfMonth > startOfToday ? startOfMonth : startOfToday,
          lte: endOfMonth,
        };
      }
    } else {
      // No month/year filter, just past/upcoming logic
      dateFilter = past
        ? { lt: startOfToday }
        : { gte: startOfToday };
    }

    // Base where clause
    const where: any = { date: dateFilter };

    // Search filter
    if (search.trim()) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Total count for pagination
    const total = await prisma.event.count({ where });

    // Fetch paginated & filtered results
    const events = await prisma.event.findMany({
      where,
      orderBy: { date: past ? 'desc' : 'asc' },
      take: limit > 0 ? limit : 10,
      skip: skip > 0 ? skip : undefined,
    });

    return NextResponse.json({ total, events }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
