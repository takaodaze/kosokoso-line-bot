import { MessageEvent } from "./types.ts";
import {
  BON_DAIMONJI_GROUP_ID,
  LINE_MESSAGING_API_END_POINT,
} from "./constants.ts";

import requestHeader from "./header.ts";

export async function handleRequest(request: Request) {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  const contentType = request.headers.get("content-type");

  if (contentType == null) {
    return new Response(
      JSON.stringify({ error: "please provide 'content-type' header" }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }

  if (contentType.includes("application/json")) {
    const json = await request.json();
    console.log(json);

    const messageEvent = json as MessageEvent;

    if (messageEvent.events[0].source.type === "group") {
      console.log("Not responding to events from the group");
      return new Response();
    }

    const receivedMessage = messageEvent.events[0].message.text;
    const replyToken = messageEvent.events[0].replyToken;

    if (json.events.length > 0) {
      await pushMessage(
        receivedMessage,
        BON_DAIMONJI_GROUP_ID,
      );

      await replyMessage(
        `"${receivedMessage}" をボン大文字グループに送信しました`,
        replyToken,
      );
    }

    return new Response();
  }
}

async function pushMessage(
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

  return fetch(LINE_MESSAGING_API_END_POINT.PUSH, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(body),
  });
}

async function replyMessage(
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

  return fetch(LINE_MESSAGING_API_END_POINT.REPLY, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(body),
  });
}
