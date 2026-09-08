// Codespaces forwards backend port 8000 under this predictable hostname pattern.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

// Backend may return a plain array or a paginated { results: [...] } payload.
export async function fetchResource(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource} (${response.status})`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : (data?.results ?? []);
}
