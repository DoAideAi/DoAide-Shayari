import { useState } from 'react';
import { copyToClipboard, shareForInstagram, shareOnTwitter, shareOnWhatsApp } from '../utils/share';
import { trackShare } from '../api/client';
import { Link } from 'react-router-dom';

export default function ContentCard({ item, showLink = true }) {
  const [copied, setCopied] = useState(false);
  const [igHint, setIgHint] = useState(false);

  const fullText = `${item.text_hindi}\n\n${item.text_transliteration}`;

  const handleCopy = async () => {
    const ok = await copyToClipboard(fullText);
    if (ok) {
      trackShare(item.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    trackShare(item.id);
    shareOnWhatsApp(fullText);
  };

  const handleTwitter = () => {
    trackShare(item.id);
    shareOnTwitter(item.text_hindi);
  };

  const handleInstagram = async () => {
    const result = await shareForInstagram(fullText);
    if (result === 'shared' || result === 'copied') trackShare(item.id);
    if (result === 'copied') {
      setIgHint(true);
      setTimeout(() => setIgHint(false), 2500);
    }
  };

  return (
    <div className="bg-[var(--da-bg)] rounded-2xl shadow-lg border border-[var(--da-border)] overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-5 sm:p-6">
        <p className="font-hindi text-lg sm:text-xl text-[var(--da-text)] leading-relaxed whitespace-pre-line mb-3">
          {item.text_hindi}
        </p>
        <p className="text-sm text-[var(--da-text-secondary)] italic whitespace-pre-line mb-4">
          {item.text_transliteration}
        </p>
        {item.author && (
          <p className="text-xs text-[var(--da-text-secondary)] mb-3">— {item.author}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[48px] rounded-full text-sm font-medium bg-[var(--da-surface)] text-[var(--da-text)] hover:bg-primary-50 hover:text-primary-700 transition-colors border border-[var(--da-border)]"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                कॉपी हो गया!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                कॉपी करें
              </>
            )}
          </button>
          <button
            onClick={handleWhatsApp}
            aria-label="WhatsApp पर शेयर करें"
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[48px] rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </button>
          <button
            onClick={handleTwitter}
            aria-label="X (Twitter) पर शेयर करें"
            className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full text-sm font-medium bg-black text-white hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </button>
          <button
            onClick={handleInstagram}
            aria-label="Instagram के लिए कॉपी/शेयर करें"
            className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full text-sm font-medium bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </button>
          {showLink && item.id && (
            <Link
              to={`/content/${item.id}`}
              aria-label="पूरा देखें"
              className="inline-flex items-center gap-1 px-3 py-2 min-h-[48px] min-w-[48px] justify-center rounded-full text-sm text-[var(--da-text-secondary)] hover:text-primary-500 hover:bg-primary-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </Link>
          )}
        </div>
        {igHint && (
          <p role="status" className="mt-2 text-xs font-medium text-primary-600">
            कॉपी हो गया! Instagram खोलकर पेस्ट करें।
          </p>
        )}
      </div>
    </div>
  );
}
