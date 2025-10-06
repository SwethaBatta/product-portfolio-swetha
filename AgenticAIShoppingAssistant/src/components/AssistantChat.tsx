import { useEffect, useState } from "react";
import { useChatStore, AssistantReply } from "./../helpers/store";
import { extractIntent, generateResponse } from "./../lib/llm";
import { filterProducts } from "./../helpers/filter";

export default function AssistantChat() {
  const {
    messages,
    addMessage,
    clearMessages,
    products,
    fetchProducts,
    isLoading,
  } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleSend() {
    if (!input.trim()) return;

    try {
      setLoading(true);
      addMessage({ role: "user", content: input });

      const intent = await extractIntent(input);
      const results = filterProducts(products, intent.filters || {});
      const reply = await generateResponse(input, results);

      addMessage({ role: "assistant", content: reply });
    } catch (err) {
      setError(err.message);
      console.error("Error during assistant reply:", err.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((m, i) => {
          if (m.role === "user") {
            return (
              <div key={i} className="text-blue-600 mb-3">
                <div className="bg-blue-100 inline-block px-3 py-2 rounded-lg">
                  {m.content as string}
                </div>
              </div>
            );
          } else {
            const reply = m.content as AssistantReply;

            if (isLoading) {
              return (
                <div key={i} className="text-center text-gray-400 mb-4">
                  <p>Fetching products...</p>
                </div>
              );
            }

            if (loading) {
              return (
                <div key={i} className="text-center text-gray-400 mb-4">
                  <p>Generating reply...</p>
                </div>
              );
            }

            // Case 1: simple string (welcome message, errors, etc.)
            if (typeof reply === "string") {
              return (
                <div key={i} className="text-green-600 mb-3">
                  <div className="bg-green-100 inline-block px-3 py-2 rounded-lg">
                    {reply}
                  </div>
                </div>
              );
            }

            if (error) {
              return (
                <div key={i} className="text-center text-red-400 mb-4">
                  <p>{error}</p>
                </div>
              );
            }

            // Case 2: structured AssistantReply (with intro/products/outro)
            return (
              <div key={i} className="text-green-700 mb-3 space-y-3">
                {/* Intro */}
                {reply.intro && (
                  <div className="bg-green-100 inline-block px-3 py-2 rounded-lg">
                    {reply.intro}
                  </div>
                )}

                {/* Products */}
                <div className="grid grid-cols-2 gap-3">
                  {reply.products?.map((p: any) => (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border rounded-xl p-2 bg-white shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-24 object-contain mx-auto mb-2"
                      />
                      <p className="font-semibold text-sm line-clamp-2">
                        {p.name}
                      </p>
                      <p className="text-gray-600 text-sm">${p.price}</p>
                      {p.narrative && (
                        <p className="text-gray-500 text-xs mt-1">
                          {p.narrative}
                        </p>
                      )}
                    </a>
                  ))}
                </div>

                {/* Outro */}
                {reply.outro && (
                  <div className="bg-green-100 inline-block px-3 py-2 rounded-lg">
                    {reply.outro}
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>

      {/* Input Area */}
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Ask for a product..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 ml-2 rounded"
        >
          Send
        </button>
        <button
          onClick={clearMessages}
          className="bg-gray-300 text-gray-800 px-3 ml-2 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
