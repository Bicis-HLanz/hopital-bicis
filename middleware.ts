import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Client, Account, Models } from 'node-appwrite'

// Verificar si el usuario está autenticado consultando la sesión
async function isAuthenticated(sessionValue: string) {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setSession(sessionValue)

    const account = new Account(client)
    const user = await account.get()
    return user
  } catch {
    return null
  }
}

// Verificar si el email del usuario pertenece a un administrador
function isAdmin(user: Models.User<Models.Preferences>) {
  return user.labels && user.labels.includes('admin')
}

export async function middleware(request: NextRequest) {
  // Para rutas de gestionar, verificamos autenticación y autorización
  if (request.nextUrl.pathname.startsWith('/gestionar')) {
    // Obtener la cookie de sesión
    const sessionCookie = request.cookies.get('my-custom-session')
    
    if (!sessionCookie || !sessionCookie.value) {
      // Si no hay sesión, redirigir a login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    // Verificar la sesión y obtener el usuario
    const user = await isAuthenticated(sessionCookie.value)
    
    if (!user) {
      // Si no se puede verificar el usuario, redirigir a login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    // Verificar si el usuario tiene permisos de administrador
    if (!isAdmin(user)) {
      // Si no es admin, redirigir a reservar (área de usuarios normales)
      const accessDeniedUrl = new URL('/reservar', request.url)
      return NextResponse.redirect(accessDeniedUrl)
    }
  }

  return NextResponse.next()
}

// Puedes limitar en qué rutas se ejecuta el middleware
export const config = {
  matcher: ['/gestionar/:path*', '/:reservar*', '/dashboard/:path*', '/settings/:path*'],
}