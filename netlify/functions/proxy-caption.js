// Importing 'node-fetch' using CommonJS syntax
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const captionUrl = `https://ccb.megafiles.store${event.path}`;

  try {
    // Fetching the caption file from the URL
    const response = await fetch(captionUrl);
    const captionData = await response.text();

    return {
      statusCode: 200,
      body: captionData,
      headers: {
        'Content-Type': 'text/vtt', // Set correct MIME type for captions
      },
    };
  } catch (error) {
    // Handle any errors (e.g., network issues)
    console.error('Error fetching caption file:', error);
    return {
      statusCode: 500,
      body: 'Error fetching caption file',
    };
  }
};



