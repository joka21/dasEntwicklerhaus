import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Prüft die Better-Auth-Sitzung (in der Datenbank) und schützt /portal/*.
// Next 16: proxy statt middleware, läuft in der Node.js-Runtime.
// Die Seiten prüfen den Login zusätzlich selbst.
export async function proxy(request: NextRequest) {
  // returnHeaders: Verlängert Better Auth die Sitzung, kommt das neue Cookie
  // als Set-Cookie zurück und wird an die Antwort weitergegeben.
  const { headers: authHeaders, response: sitzung } = await auth.api.getSession({
    headers: request.headers,
    returnHeaders: true,
  })

  const response =
    !sitzung && request.nextUrl.pathname.startsWith('/portal')
      ? NextResponse.redirect(loginUrl(request))
      : NextResponse.next({ request })

  authHeaders.getSetCookie().forEach((cookie) => response.headers.append('set-cookie', cookie))
  return response
}

function loginUrl(request: NextRequest): URL {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.search = ''
  return url
}

export const config = {
  matcher: ['/portal/:path*', '/login/:path*'],
}
