const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3081';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json();
}

export function fetchContent(category, params = {}) {
  const query = new URLSearchParams();
  if (params.subcategory) query.set('subcategory', params.subcategory);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.random) query.set('random', 'true');
  return request(`/api/content/${category}?${query}`);
}

export function fetchSingleContent(category, id) {
  return request(`/api/content/${category}/${id}`);
}

export function fetchCategories() {
  return request('/api/categories');
}

export function fetchDaily() {
  return request('/api/daily');
}

export function searchContent(q, page = 1) {
  return request(`/api/search?q=${encodeURIComponent(q)}&page=${page}`);
}

export function generateMessage(data) {
  return request('/api/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
