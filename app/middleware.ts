import { NextRequest, NextResponse } from "next/server";

const ROUTE_PERMISSIONS: Record<string, string> = {
  "/admin/dashboard": "dashboard",
  "/admin/users": "users",
  "/admin/analytics": "analytics",
  "/admin/reports": "reports",
  "/admin/config": "config",
  "/admin/logs": "logs",
};

const ROLE_MAP: Record<string, string[]> = {
  SUPER_ADMIN: ["dashboard","users","analytics","reports","config","logs"],
  ADMIN: ["dashboard","users","analytics","reports"],
  MODERATOR: ["dashboard","users","reports"],
  VIEWER: ["dashboard","analytics"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/two-factor")
  ) {
    return NextResponse.next();
  }

  const session = req.cookies.get("admin_session")?.value;
  const twoFA = req.cookies.get("admin_2fa")?.value;
  const role = req.cookies.get("admin_role")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (!twoFA) {
    return NextResponse.redirect(new URL("/admin/two-factor", req.url));
  }

  const permission = ROUTE_PERMISSIONS[pathname];
  if (permission && role) {
    const allowed = ROLE_MAP[role] || [];
    if (!allowed.includes(permission)) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
