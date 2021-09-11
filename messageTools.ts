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

export async function getImageBinary(messageId: string) {
  try {
    const endpoint =
      `https://api-data.line.me/v2/bot/message/${messageId}/content`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: requestHeader,
    });
    if (res.body == null) return;

    let base64ImageBinary = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf8");
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value != null) {
        const b64encoded = btoa(decoder.decode(value));
        base64ImageBinary = base64ImageBinary + b64encoded;
      }
    }
    console.log("debug:imageBinary:", base64ImageBinary);
  } catch (err) {
    console.error("ocurred error! getImegeBinary func running:", err);
  }
}
