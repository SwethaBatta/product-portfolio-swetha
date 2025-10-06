export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

export type AssistantMessage =
  | { role: "assistant"; type: "text"; text: string }
  | { role: "assistant"; type: "products"; products: Product[] }
  | { role: "user"; type: "text"; text: string };

export type ChatState = {
  messages: AssistantMessage[];
  addMessage: (msg: AssistantMessage) => void;
  clearMessages: () => void;
};
