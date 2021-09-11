import { handleRequest } from "./handleRequest.ts";

addEventListener("fetch", async (event) => {
  await event.respondWith(await handleRequest(event.request));
});
