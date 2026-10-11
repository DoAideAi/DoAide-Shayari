export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--da-bg)] border border-[var(--da-border)] text-[var(--da-text)] hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        ← पिछला
      </button>
      <span className="px-4 py-2 text-sm text-[var(--da-text-secondary)]">
        {page} / {pages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--da-bg)] border border-[var(--da-border)] text-[var(--da-text)] hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        अगला →
      </button>
    </div>
  );
}
