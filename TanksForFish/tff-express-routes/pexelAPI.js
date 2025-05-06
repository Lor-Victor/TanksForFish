import { createClient } from 'pexels';

const client = createClient(process.env.PEXELS_API_KEY);

export function searchPhotos(query, perPage = 5) {
  return client.photos.search({ query, per_page: perPage });
}
