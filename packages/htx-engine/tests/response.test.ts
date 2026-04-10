import { expect, test } from "bun:test";

import { Response } from "../src";

test("response factories preserve php-style status and headers", async () => {
  const redirect = Response.redirect("/posts/hello");
  expect(redirect.status).toBe(302);
  expect(redirect.headers.Location).toBe("/posts/hello");

  const notFound = Response.notFound();
  expect(notFound.status).toBe(404);
  expect(notFound.headers["Content-Type"]).toBe("text/html; charset=UTF-8");

  const error = Response.error();
  expect(error.status).toBe(500);
  expect(error.headers["Content-Type"]).toBe("text/html; charset=UTF-8");

  const webResponse = redirect.toWebResponse();
  expect(webResponse.status).toBe(302);
  expect(webResponse.headers.get("Location")).toBe("/posts/hello");
  expect(await webResponse.text()).toBe("");
});
