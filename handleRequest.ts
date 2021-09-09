import { MessageEvent } from "./types.ts";
import { BON_DAIMONJI_GROUP_ID } from "./constants.ts";
import { pushMessage, replyMessage } from "./messageTools.ts";

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

  // json で送信されていなかった場合、処理を中断する
  if (!contentType.includes("application/json")) {
    return new Response();
  }

  // リクエストが正当であるため、処理を始める

  const json = await request.json();
  console.log(json);

  const messageEvent = json as MessageEvent;

  // log for debug
  console.log(
    "messageEvent.events[0].message.contentProvider",
    messageEvent.events[0]?.message?.contentProvider,
  );

  if (messageEvent.events[0].source.type === "group") {
    console.log("Not responding to events from the group");
    return new Response();
  }

  const receivedMessage = messageEvent.events[0].message.text as string;
  const messageType = messageEvent.events[0].message.type;
  const replyToken = messageEvent.events[0].replyToken;

  if (messageType !== "text") {
    await replyMessage(
      "現在、scandal はテキストのみの送信に対応しています",
      replyToken,
    );
    return;
  }

  await pushMessage(
    receivedMessage,
    BON_DAIMONJI_GROUP_ID,
  );

  await replyMessage(
    `"${receivedMessage}" をボン大文字グループに送信しました`,
    replyToken,
  );

  return new Response();
}
