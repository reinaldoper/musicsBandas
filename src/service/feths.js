
export const search = async (searcH, options) => {
  const  url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searcH}`;
  const query = await fetch(url, options);
  const response = query.json();
  return response;
}