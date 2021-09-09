import { LINE_MESSAGING_API_END_POINT } from "./constants.ts";
import requestHeader from "./header.ts";

export async function pushMessage(
  message: string,
  to: string,
) {
  const body = {
    to: to,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  };

  return await fetch(LINE_MESSAGING_API_END_POINT.PUSH, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(body),
  });
}

export async function replyMessage(
  message: string,
  replyToken: string,
) {
  const body = {
    replyToken,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  };

  return await fetch(LINE_MESSAGING_API_END_POINT.REPLY, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(body),
  });
}
