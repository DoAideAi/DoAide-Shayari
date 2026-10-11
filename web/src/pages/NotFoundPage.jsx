import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="पेज नहीं मिला | 404 - DoAide Shayari"
        description="यह पेज मौजूद नहीं है।"
        url="/404"
      />
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl font-bold text-primary-500 mb-4">404</p>
        <h1 className="text-3xl font-bold text-[var(--da-text)] mb-2 font-hindi">पेज नहीं मिला</h1>
        <p className="text-[var(--da-text-secondary)] mb-6">यह पेज मौजूद नहीं है या हटा दिया गया है।</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          ← होम पेज पर जाएं
        </Link>
      </div>
    </>
  );
}
