import { Groq } from "groq-sdk";

const apiKey = "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";
const client = new Groq({ apiKey, dangerouslyAllowBrowser: true  });

export async function getProductData(userCity) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I am a Coal Mine Owner In ${userCity}.

                  I want you to tell me how to use Methane Capture to reduce the carbon offset.

                  Answer in the following JSON format:

                    {
                      "Name": "...",
                      "Goal": "...", (Start with a number That is short and has some numbers like capture this much methane (and don't have any time limit))
                      "Estimated Carbon Offset": "... Metric tons per year",
                      "Short Desc": "..." (1-2 Lines short)
                    }

                  Be to the point and Concise
                  
                  Give only one Solution`
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
    console.log("Methane API response:", result);

    // Try parsing the result
    const parsedResult = JSON.parse(result);
    console.log("Parsed Methane result:", parsedResult);

    return parsedResult;
  } catch (error) {
    console.error("Error in getProductData:", error);
    return {
      Name: "Default Methane Capture Plan",
      Goal: "Capture 10 million cubic feet of methane per day",
      "Estimated Carbon Offset": "22,500 Metric tons per year",
      "Short Desc": "Implement a basic methane capture system to reduce emissions."
    };
  }
}