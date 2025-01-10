// proxy-caption.js
import fetch from 'node-fetch'; // Use `import` for ES module

export async function handler(event, context) {
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
    console.error("Error fetching caption:", error);
    return {
      statusCode: 500,
      body: 'Error fetching caption file',
    };
  }
}


