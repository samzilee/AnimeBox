exports.handler = async function(event, context) {
  const { default: fetch } = await import('node-fetch');  // Dynamic import for node-fetch

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
    console.error("Error fetching caption:", error);  // Log any errors
    return {
      statusCode: 500,
      body: 'Error fetching caption file',
    };
  }
};

