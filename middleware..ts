import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  // Check if user is logged in
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  // Check if trying to access admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Only allow ADMIN role
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'], // Protect all /admin routes
}
