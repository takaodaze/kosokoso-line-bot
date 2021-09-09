import { env } from "./env.ts";

export async function handleRequest(request: Request) {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  if (!request.headers.has("content-type")) {
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

  const contentType = request.headers.get("content-type");

  if (contentType == null) {
    console.error("contentType is null!");
    return new Response(null, {
      status: 400,
    });
  }

  if (contentType.includes("application/json")) {
    const json = await request.json();
    console.log(json);

    if (json.events.length > 0) {
      await replyMessage(
        json.events[0]?.message?.text,
        json.events[0]?.replyToken,
        env.CHANNEL_ACCESS_TOKEN,
      );
    }

    return new Response();
  }
}

async function replyMessage(
  message: string,
  replyToken: string,
  token: string,
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

  return fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}
