const env = {
  CHANNEL_ACCESS_TOKEN: Deno.env.get("CHANNEL_ACCESS_TOKEN") || "",
};

export default env;
