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

    await res.body?.cancel();

    const imageBinary: number[] = [];
    if (res.body == null) {
      return;
    }
    // const reader = res.body.getReader();
    // while (true) {
    //   const { value, done } = await reader.read();
    //   value?.forEach((binary) => imageBinary.push(binary));
    //   if (done) {
    //     await reader.cancel();
    //     break;
    //   }
    // }
    // console.log("debug:res:", res);
    // console.log("debug:imageBinary:", imageBinary);
  } catch (err) {
    console.error("ocurred error! getImegeBinary func running:", err);
  }
}
