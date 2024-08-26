const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash", generationConfig: {responseMimeType: "application/json"}});

const handler = async (event) => {
  try {
    const prompt = "３日間の大阪旅行プランを作って下さい。考えてほしいのは観光場所、食事場所、宿泊場所の３つです。ただし、出力は'itinerary': [{'day': 1,'date': '2024-09-10','activities': [{'time': '12:00','activity': '博多ラーメンを食べる','query': '博多+博多ラーメン'}]}]というようにしてください。";
    
    // コンテンツを生成する
    const result = await model.generateContent(prompt);
    
    const response = await result.response;
    
    // 生成されたテキストを取得
    const text = response.text();  // APIドキュメントに基づいてこの部分を確認する必要あり
    
    return {
      statusCode: 200,
      body: text,
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
