/** Every internal path in one place. */
export const ROUTES = {
  home: "/",
  posts: "/posts",
  post: (slug: string) => `/posts/${slug}`,
  topics: "/#chu-de",
  login: "/login",
  authCallback: "/auth/callback",
  signOut: "/auth/signout",
  dashboard: "/dashboard",
  me: "/me",
  apiMe: "/api/me",
} as const;

/** Anchor id of the topics section on the home page (ROUTES.topics points here). */
export const TOPICS_SECTION_ID = "chu-de";

/** Routes that need a signed-in user; the proxy redirects to login otherwise. */
export const PROTECTED_ROUTE_PREFIXES = [ROUTES.dashboard, ROUTES.me] as const;

/** Query-string keys shared by login, callback and proxy. */
export const QUERY_PARAMS = {
  next: "next",
  error: "error",
  sent: "sent",
  code: "code",
} as const;
