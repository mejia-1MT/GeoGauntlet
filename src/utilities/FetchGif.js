export const fetchGif = async () => {
  const apiKey = "hgBg4f9A8dE01tjfDZfNRHPqUb8dhA21";
  const query = "fail";
  const limit = 50;

  const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}`;

  try {
    const response = await fetch(giphyApiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.data[Math.floor(Math.random() * data.data.length)]?.images
      ?.original?.url;
  } catch (error) {
    console.error("Failed to fetch GIF:", error);
  }
};
