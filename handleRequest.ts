export function handleRequest(request: Request) {
  const pathname: URL = new URL(request.url);
  const value: string | undefined = Deno.env.get("FOO");
  const txt = ` Hello DenoDeploy!\n path : ${pathname}\n value:${value}\n`;
  return new Response(txt, {
    headers: { "content-type": "text/plain" },
  });
}
