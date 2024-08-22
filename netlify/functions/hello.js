//const { GoogleGenerativeAI } = require("@google/generative-ai");

//const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handler = async (event) => {
  try {
    //const prompt = "Write a story about an AI and magic";
    
    //const result = await model.generateContent(prompt);
    
    //const response = await result.response;
    
    //const text = response.text();  // APIドキュメントに基づいてこの部分を確認する必要あり
    
    return {
      statusCode: 200,
      body: process.env.API_KEY,
    };
  } catch (error) {
    // エラーハンドリング
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = { handler };
