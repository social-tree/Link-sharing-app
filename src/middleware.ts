import { NextRequest, NextResponse } from 'next/server'

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const nonLoggedInUserRegex = /^\/(|login|register)$/
const loggedInUserRoutes = /^\/(profile|preview)$/

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname.match(nonLoggedInUserRegex)) {
    return NextResponse.redirect(new URL('/profile/links', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname.match(loggedInUserRoutes)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/register', '/login', '/profile/:path*'],
}
