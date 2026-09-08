// Backend may return a plain array or a paginated { results: [...] } payload.
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status})`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
}
