import { auth } from "@/lib/auth/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getRequest().headers,
    returnHeaders: true,
  });

  const cookies = session.headers?.getSetCookie();
  if (cookies) {
    setResponseHeader("Set-Cookie", cookies);
  }

  return session.response?.user || null;
});
