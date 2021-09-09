import env from "./env.ts";

const requestHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${env.CHANNEL_ACCESS_TOKEN}`,
};

export default requestHeader;
