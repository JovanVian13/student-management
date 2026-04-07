import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/mahasiswa"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authStorage = request.cookies.get("auth-storage");

  let isAuthenticated = false;

  try {
    if (authStorage?.value) {
      const parsed = JSON.parse(authStorage.value);
      isAuthenticated = !!parsed?.state?.user;
    }
  } catch {
    isAuthenticated = false;
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Belum login tapi coba akses protected route → redirect ke login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Simpan halaman tujuan supaya bisa redirect balik setelah login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Sudah login tapi coba akses /login atau /register → redirect ke dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Tentukan route mana saja yang dijalankan middleware-nya
// Exclude static files dan api routes supaya tidak lambat
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};