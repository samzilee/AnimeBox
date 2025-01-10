// netlify/functions/proxy-caption.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const captionUrl = `https://ccb.megafiles.store${event.path}`;

  try {
    const response = await fetch(captionUrl);
    const captionData = await response.text();

    return {
      statusCode: 200,
      body: captionData,
      headers: {
        'Content-Type': 'text/vtt',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching caption file',
    };
  }
};
