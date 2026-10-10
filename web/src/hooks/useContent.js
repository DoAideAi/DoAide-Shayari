import { useQuery } from '@tanstack/react-query';
import { fetchContent, fetchDaily, fetchCategories, searchContent, fetchSingleContent } from '../api/client';

export function useContent(category, params = {}) {
  return useQuery({
    queryKey: ['content', category, params],
    queryFn: () => fetchContent(category, params),
    enabled: !!category,
  });
}

export function useDaily() {
  return useQuery({
    queryKey: ['daily'],
    queryFn: fetchDaily,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

export function useSearch(query, page = 1) {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchContent(query, page),
    enabled: !!query && query.length >= 2,
  });
}

export function useSingleContent(category, id) {
  return useQuery({
    queryKey: ['content', category, id],
    queryFn: () => fetchSingleContent(category, id),
    enabled: !!category && !!id,
  });
}
