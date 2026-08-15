export const getQuotes = async () => {
  try {
    const response = await fetch(
      "https://indian-quotes-api.vercel.app/api/quotes/random",
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error in getting response", error);
  }
};
