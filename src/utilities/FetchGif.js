export const fetchGif = async () => {
  const apiKey = "hgBg4f9A8dE01tjfDZfNRHPqUb8dhA21"; // Replace with your actual API key
  const query = "fail"; // You can customize the query
  const limit = 50; // Fetch one GIF

  const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}`;

  try {
    const response = await fetch(giphyApiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.data[Math.floor(Math.random() * data.data.length)]?.images
      ?.original?.url; // Return the GIF URL
  } catch (error) {
    console.error("Failed to fetch GIF:", error);
  }
};
