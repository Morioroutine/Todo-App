import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/hello","/api/webhook"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};