import { handleRequest } from "./handleRequest.ts";

addEventListener("fetch", (event: any) => {
  event.respondWith(handleRequest(event.request));
});
