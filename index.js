import { handleRequest } from "./handleRequest.ts";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
