import { create } from "zustand";

export interface AssistantReply {
  intro: string;
  products: {
    id: number;
    name: string;
    price: number;
    image: string;
    narrative: string;
    url: string;
  }[];
  outro: string;
}

interface Message {
  role: "user" | "assistant";
  content: string | AssistantReply;
}

interface Store {
  messages: Message[];
  products: any[];
  isLoading: boolean;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
  fetchProducts: () => Promise<void>;
}

export const useChatStore = create<Store>((set) => ({
  messages: [
    {
      role: "assistant",
      content:
        "👋 Welcome! I’m your shopping assistant. Ask me about products, categories, or set filters like price or style.",
    },
  ],
  products: [],
  isLoading: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  clearMessages: () =>
    set(() => ({
      messages: [
        {
          role: "assistant",
          content:
            "👋 Welcome! I’m your shopping assistant. Ask me about products, categories, or set filters like price or style.",
        },
      ],
    })),
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      set({ products: data });
    } catch (e) {
      console.error("Failed to fetch products:", e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
