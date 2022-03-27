// @ts-ignore(2691)
import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
const denoStdVersion = "0.132.0";

async function handler(request: Request): Promise<Response> {
  let reqHeaders: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    reqHeaders[k] = v;
  })
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
      "x-deno-std": denoStdVersion,
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);
