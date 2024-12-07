import { Groq } from "groq-sdk";

const apiKey = "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";
const client = new Groq({ apiKey, dangerouslyAllowBrowser: true  });

export async function getInventoryData(userCity) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I am a Coal Mine Owner In ${userCity}.

                  I want you to tell me how to use Electric Vehicles and Equipments to reduce the carbon offset.

                  Answer in the following JSON format:

                  "Name": 
                  "Goal":  {That is short and has some numbers like switch 70% to EV (and don't have any time limit) }
                  "Estimated Carbon Offset": from that per year (like 100 Metric tone per year)
                  "Short Desc": { 1-2 Lines short}
                  
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
    console.log("EV Impact API response:", result);

    // Try parsing the result
    const parsedResult = JSON.parse(result);
    console.log("Parsed EV Impact result:", parsedResult);

    return parsedResult;
  } catch (error) {
    console.error("Error in getInventoryData:", error);
    return {
      Name: "Default EV Implementation Plan",
      Goal: "Switch 70% of vehicles to electric",
      "Estimated Carbon Offset": "15,000 Metric tons per year",
      "Short Desc": "Implement electric vehicles in mining operations."
    };
  }
}