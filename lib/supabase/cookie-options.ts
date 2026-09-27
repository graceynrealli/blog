export const authCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  // Session tokens are only ever read on the server.
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
