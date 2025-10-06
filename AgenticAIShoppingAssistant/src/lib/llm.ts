import OpenAI from "openai";

const client = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    maxRetries: 0, // disables automatic retries,
})

export async function extractIntent(userInput: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "You are a shopping query parser. Extract intent from the user query and return JSON only. Keys: category, filters (color, style, price_max). No explanations.",
      },
      { role: "user", content: userInput },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function generateResponse(userInput: string, products: any[]) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `
        You are a helpful shopping assistant. 
        You are given a list of real products. 
        Summarize them conversationally with a short intro, 
        mention name, price, image, and add a short narrative for each product. 
        If no products are found, suggest relaxing filters. 
        Always return your results in this JSON structure only:
        {
          "intro": "string",
          "products": [
            { "id": number, "name": "string", "price": number, "image": "string", "narrative": "string", "url": "string" }
          ],
          "outro": "string"
        }`,
      },
      { role: "user", content: `User asked: ${userInput}` },
      { role: "assistant", content: `Products: ${JSON.stringify(products.slice(0, 5))}` },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}