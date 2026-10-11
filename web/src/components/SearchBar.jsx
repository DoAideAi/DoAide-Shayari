import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="शायरी या मैसेज खोजें..."
        className="w-full px-5 py-3 pl-12 rounded-full bg-[var(--da-bg)] border border-[var(--da-border)] text-[var(--da-text)] placeholder-[var(--da-text-secondary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
      />
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--da-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  );
}
