import { Groq } from "groq-sdk";

const apiKey = "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";
const client = new Groq({ apiKey, dangerouslyAllowBrowser: true  });

export async function getUserData(userCity) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I am a Coal Mine Owner In ${userCity}.

I want you to tell me how to switch to Renewable fuels to reduce the carbon offset.

Answer in the following JSON format:

{
  "Name": "Name of the renewable energy solution",
  "Goal": "Switch X% fuels to Renewable",
  "Estimated Carbon Offset": "Y Metric tons per year",
  "Short Desc": "A brief description of the solution"
}

Ensure all values are strings and properly enclosed in quotes. Be concise and to the point.

Give only one solution.`
        }
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object"
      },
      stop: null
    });

    const result = chatCompletion.choices[0].message.content;
    console.log("Renew API response:", result);

    // Parse the result to ensure it's valid JSON
    const parsedResult = JSON.parse(result);
    console.log("Parsed Renew result:", parsedResult);

    return parsedResult;
  } catch (error) {
    console.error("Error in getUserData:", error);
    // Return a default object if there's an error
    return {
      Name: "Default Renewable Energy Plan",
      Goal: "Switch 50% fuels to Renewable",
      "Estimated Carbon Offset": "10,000 Metric tons per year",
      "Short Desc": "Implement renewable energy sources in mining operations."
    };
  }
}