// @ts-ignore(2691)
import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
// @ts-ignore(2691)
import { VERSION } from "https://deno.land/std@0.132.0/version.ts";

async function handler(request: Request): Promise<Response> {
  const reqHeaders: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    reqHeaders[k] = v;
  });
  const req = {
    method: request.method,
    url: request.url,
    credentials: request.credentials,
    mode: request.mode,
    headers: reqHeaders,
    redirect: request.redirect,
    body: await request.text(),
  };

  return new Response(JSON.stringify(req), {
    headers: {
      "content-type": "application/json",
      "x-deno": Deno.version.deno,
      "x-deno-v8": Deno.version.v8,
      "x-deno-ts": Deno.version.typescript,
      "x-deno-std": VERSION,
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);
