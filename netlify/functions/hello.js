const axios = require('axios');

const handler = async (event) => {
  try {
    const apiUrl = 'https://www.jalan.net/activity/json/arealist.json';
    const response = await axios.get(apiUrl);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
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