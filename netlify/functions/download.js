exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get TikTok URL from request
    const { url } = JSON.parse(event.body);
    
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'TikTok URL is required' })
      };
    }

    // Call RapidAPI (GoDownloader API) - CORRECT ENDPOINT
    const response = await fetch(`https://tiktok-download-video-no-watermark.p.rapidapi.com/tiktok/info?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a5882c9424msh2872ce25602f78dp13f528jsn4bb4e6e14104',
        'X-RapidAPI-Host': 'tiktok-download-video-no-watermark.p.rapidapi.com'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to download video', details: error.message })
    };
  }
};
