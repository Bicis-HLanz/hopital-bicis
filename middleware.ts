// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(request: NextRequest) {
    


  //console.log('all cookies', request.cookies.getAll())
  
  if (request.nextUrl.pathname.startsWith('/gestionar')) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Puedes limitar en qué rutas se ejecuta el middleware
export const config = {
  matcher: ['/gestionar/:path*', '/:reservar*', '/dashboard/:path*', '/settings/:path*'],
}