const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Ensure the event path is the correct relative path, not the full URL
  const captionPath = event.path.replace(/^\/\.netlify\/functions\/proxy-caption\//, ''); // Remove the proxy part of the path
  const captionUrl = `https://ccb.megafiles.store/${captionPath}`;

  console.log('Fetching caption URL:', captionUrl); // Log to confirm the correct URL

  try {
    const response = await fetch(captionUrl);

    // Check if the response status is 200 OK
    if (!response.ok) {
      console.error(`Failed to fetch caption. Status: ${response.status}`);
      return {
        statusCode: response.status,
        body: `Error fetching caption file: ${response.statusText}`,
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
    console.error('Error fetching caption file:', error);
    return {
      statusCode: 500,
      body: 'Error fetching caption file',
    };
  }
};

