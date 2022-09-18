const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';

export default async function getImages(searchQuery, page = 1) {
  const searchParams = new URLSearchParams({
    key: '29082110-259fa3573f07e09f564e9c4c2',
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: `${page}`,
  });
  const url = `${BASE_URL}?&${searchParams}`;
  return await axios.get(url);
}
