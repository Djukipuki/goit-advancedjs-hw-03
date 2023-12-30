import axios from "axios";

const CAT_API_KEY = "live_CgFNJ52ujOJpDB32oyPIWsDLhJLkQck9ObP4pbWX6xNuFZ0SXuimVoJ674rK3QhY";
const CAT_BASE_URL = "https://api.thecatapi.com/v1";

const CAT_BREEDS_PATH = '/breeds';
const CAT_IMAGES_SEARCH_PATH = '/images/search';

const catApi = axios.create({
  baseURL: CAT_BASE_URL,
  headers: {'x-api-key': CAT_API_KEY}
});

export const fetchBreeds = () => {
  return catApi.get(CAT_BREEDS_PATH);
}

export const fetchCatByBreedId = (id) => {
  const searchParams = new URLSearchParams({
    breed_ids: id,
  });

  return catApi.get(`${CAT_IMAGES_SEARCH_PATH}?${searchParams}`);
}
