export const API_END_POINT = "http://localhost:5000";

const cache = {}

const request = async (url) => {
  if(cache[url]) return cache[url]
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    cache[url] = json
    return json;
  }

  throw new Error("요청 실패");
};

export const fetchLanguages = async (keyword) => request(`${API_END_POINT}/languages?keyword=${keyword}`);
