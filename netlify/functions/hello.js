const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handler = async (event) => {
  try {
    const prompt = "Write a story about an AI and magic";
    
    // コンテンツを生成する
    const result = await model.generateContent({ prompt });
    
    // 生成されたテキストを取得
    const text = result.content;  // APIドキュメントに基づいてこの部分を確認する必要あり
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: text }),
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
