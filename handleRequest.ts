import { env } from "./env.ts";
import { MessageEvent } from "./types.ts";

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
      return new Response(
        JSON.stringify({
          message: "can not response event by group",
        }),
        {
          status: 204,
        },
      );
    }

    if (json.events.length > 0) {
      await replyMessage(
        messageEvent.events[0].message.text,
        messageEvent.events[0].replyToken,
        env.CHANNEL_ACCESS_TOKEN,
      );
    }

    return new Response();
  }
}

async function replyMessage(
  receivedMessageFromUser: string,
  replyToken: string,
  token: string,
) {
  const body = {
    replyToken,
    messages: [
      {
        type: "text",
        text: receivedMessageFromUser,
      },
    ],
  };

  return fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}
