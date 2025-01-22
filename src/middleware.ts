// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import routes from "./routes";
// import { NextRequest, NextResponse } from "next/server";
// import { HEADERS_PATH_KEY } from "./lib/utils";

// const protectedRoutes = routes
//   .filter((route) => route.isProtected)
//   .map((route) => `${route.path}(.*)`);

// const isProtectedRoute = createRouteMatcher(protectedRoutes);

// const middleware = (req: NextRequest) => {
//   const headers = new Headers(req.headers);
//   headers.set(HEADERS_PATH_KEY, req.url);

//   return NextResponse.next({ headers });
// };

// export default clerkMiddleware(async (auth, req) => {
//   middleware(req);

//   if (isProtectedRoute(req)) await auth.protect();
// });

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };
// import {
//   NextFetchEvent,
//   NextMiddleware,
//   NextRequest,
//   NextResponse,
// } from "next/server";
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import routes from "./routes";
// import {withAuth , authMiddleware} from "@kinde-oss/kinde-auth-nextjs/middleware";

// import { HEADERS_PATH_KEY } from "./lib/utils";

// export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

// const protectedRoutes = routes
//   .filter((route) => route.isProtected)
//   .map((route) => `${route.path}(.*)`);

// const isProtectedRoute = createRouteMatcher(protectedRoutes);

// const withUser: MiddlewareFactory = (next) => {
//   return clerkMiddleware(async (auth, req, _next) => {
//     if (isProtectedRoute(req)) {
//       await auth.protect();
//     }
//     return next(req, _next);
//   });
// };

// export function stackMiddlewares(
//   functions: MiddlewareFactory[] = [],
//   index = 0
// ): NextMiddleware {
//   const current = functions[index];
//   if (current) {
//     const next = stackMiddlewares(functions, index + 1);
//     return current(next);
//   }
//   return () => NextResponse.next();
// }

// const withPathname: MiddlewareFactory = (next) => {
//   return async (request: NextRequest, _next: NextFetchEvent) => {
//     // Clone the request headers and set the pathname
//     const headers = new Headers(request.headers);
//     headers.set(HEADERS_PATH_KEY, new URL(request.url).pathname);

//     // Pass the updated headers to the response
//     const response = await next(request, _next);
//     response?.headers.set(HEADERS_PATH_KEY, new URL(request.url).pathname);
//     return response;
//   };
// };

// const middlewares :MiddlewareFactory []= [withPathname,];
// export default stackMiddlewares(middlewares);

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  return withAuth(req);
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
