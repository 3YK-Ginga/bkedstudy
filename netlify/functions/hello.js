const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const handler = async (event) => {
  try {
    const apiUrl = 'https://www.jalan.net/activity/json/arealist.json';
    const response = await axios.get(apiUrl);
    
    const prompt = "Write a story about an AI and magic"
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
    // エラーがHTTPレスポンスに関連する場合
    if (error.response) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({ 
          message: error.response.statusText, 
          data: error.response.data 
        }),
      };
    }
    
    // その他のエラー
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = { handler };