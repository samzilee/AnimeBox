const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const captionUrl = `https://ccb.megafiles.store${event.path}`;

  console.log('Fetching caption URL:', captionUrl);
  
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


