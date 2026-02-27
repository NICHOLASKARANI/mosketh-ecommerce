import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/login' || 
    path === '/' || 
    path.startsWith('/products') || 
    path.startsWith('/product') || 
    path.startsWith('/cart') || 
    path.startsWith('/checkout') ||
    path.startsWith('/contact') ||
    path.startsWith('/about')

  // Check if user is trying to access admin routes
  const isAdminPath = path.startsWith('/admin')

  // Get token from cookies
  const token = request.cookies.get('token')?.value || ''

  // If trying to access admin without token, redirect to login
  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If logged in and trying to access login page, redirect to home
  if (token && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/account/:path*',
  ],
}