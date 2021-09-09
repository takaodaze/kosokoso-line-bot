export type MessageEvent = {
  destination: string;
  events: Event[];
};

type Event = {
  replyToken: string;
  type: string;
  mode: string;
  timestamp: number;
  source: {
    type: string;
    userId?: string;
    groupId?: string;
  };
  message: {
    id: string;
    type: string;
    text: string;
  };
};
