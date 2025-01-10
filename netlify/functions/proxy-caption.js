const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Extract the part of the path after '/api' to form the correct URL
  const captionPath = event.path.replace(/^\/api/, '');  // Remove "/api" prefix
  const captionUrl = `https://ccb.megafiles.store${captionPath}`;  // Build the full caption URL

  console.log("Fetching caption URL:", captionUrl); // For debugging

  try {
    // Fetch the caption file from the target URL
    const response = await fetch(captionUrl);
    
    // Check if the response is successful
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: 'Failed to fetch caption file',
      };
    }

    // Return the fetched caption data
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

