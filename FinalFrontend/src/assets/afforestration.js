import { Groq } from "groq-sdk";

const apiKey = "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";
const client = new Groq({ apiKey, dangerouslyAllowBrowser: true  });

export async function getOrderData(userCity) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I am a Coal Mine Owner In India.

                    I want you to tell me how to use afforestation method to reduce the carbon offset.

                    Answer in the following JSON format:

                    {
                      "Name": "...", (2-3 words)
                      "Goal": "...", (That is short and has some numbers like Plant 100 Trees (and don't have any time limit))
                      "Estimated Carbon Offset": "... Metric tons per year",
                      "Short Desc": "..." (1-2 Lines short (with land required use 0.0062acres/tree estimate for land total))
                    }

                    Give only one Solution and all fields are required`
        }
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object"
      },
      stop: null
    });

    const result = chatCompletion.choices[0].message.content;
    console.log("Afforestation API response:", result);

    // Try parsing the result
    const parsedResult = JSON.parse(result);
    console.log("Parsed Afforestation result:", parsedResult);

    return parsedResult;
  } catch (error) {
    console.error("Error in getOrderData:", error);
    return {
      Name: "Afforestation Plan",
      Goal: "Plant 10,000 trees",
      "Estimated Carbon Offset": "200 Metric tons per year",
      "Short Desc": "Implement an afforestation program covering 62 acres."
    };
  }
}