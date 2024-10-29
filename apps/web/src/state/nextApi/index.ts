// libraries
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

const exceptionCases = (api: any, args: any) => {
  const whitelist = ["/profiles/me", "/public", "public/"];
  if (!window.location.pathname.startsWith("/shared/client")) {
    return false;
  }
  const url = args?.url ?? args;
  for (const publicPath of whitelist) {
    if (url.startsWith(publicPath)) {
      return true;
    }
  }
  return false;
};
// api services
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({ baseUrl: "/api" });
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // just kick people to login page for now. Option to refresh token in the future
        if (typeof document !== "undefined" && !exceptionCases(api, args)) {
          location.href = "/login";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const nextApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: "nextApi",
  tagTypes: ["Products", "Product"],
});
