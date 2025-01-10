const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Extract the actual caption path by removing '/api' from the URL
  const captionPath = event.path.replace(/^\/.netlify\/functions\/proxy-caption/, '');  // Remove '/.netlify/functions/proxy-caption'
  const captionUrl = `https://ccb.megafiles.store${captionPath}`;  // Build the full URL to fetch the caption file

  console.log("Fetching caption URL:", captionUrl); // For debugging

  try {
    // Fetch the caption file from the remote server
    const response = await fetch(captionUrl);
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: 'Failed to fetch caption file',
      };
    }

    const captionData = await response.text();

    return {
      statusCode: 200,
      body: captionData,
      headers: {
        'Content-Type': 'text/vtt',
      },
    };
  } catch (error) {
    console.error('Error fetching caption:', error);
    return {
      statusCode: 500,
      body: 'Error fetching caption file',
    };
  }
};
