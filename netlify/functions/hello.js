const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash", generationConfig: {responseMimeType: "application/json"}});

const handler = async (event) => {
  try {
    const prompt = 
`出発地:[福島県],目的地:[大阪府],期間:[2024-08-29~2024-09-01],人数:[2],旅のオーダー:[自然を満喫したい]を基に、移動アクティビティを除く旅行プランを提案してください。
出力条件:出力は以下の形式にしてください。
'itinerary': [
  {
    'day': 1,
    'date': 'YYYY-MM-DD',
    'activities': [
      {
        'time': 'HH:MM',
        'activity': '活動内容',
        'query': '地域・拠点情報名称およびカテゴリー名称(「+」区切りで複数指定可能)'
      }
    ]
  }
  ...
]`;
    
    // コンテンツを生成する
    const result = await model.generateContent(prompt);
    
    const response = await result.response;
    
    // 生成されたコンテンツを取得
    const text = response.text();
    
    const jsonObject = JSON.parse(text);
    
    const prettystr = JSON.stringify(jsonObject, null, 2);
    
    return {
      statusCode: 200,
      body: prettystr,
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
