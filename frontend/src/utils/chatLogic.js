export const processQuery = async (query) => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.responses;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return [
      { type: "text", content: "Sorry, I am having trouble connecting to the server right now." }
    ];
  }
};
