import { Link } from 'react-router-dom';
import { useState } from 'react';

const NAV_LINKS = [
  { to: '/hindi-shayari', label: 'शायरी' },
  { to: '/good-morning-images', label: 'गुड मॉर्निंग' },
  { to: '/good-night-images', label: 'गुड नाइट' },
  { to: '/birthday-wishes', label: 'बर्थडे' },
  { to: '/generate', label: '✨ AI Generator' },
];

const FOOTER_LINKS = [
  { to: '/hindi-shayari', label: 'हिंदी शायरी' },
  { to: '/love-shayari', label: 'लव शायरी' },
  { to: '/sad-shayari', label: 'सैड शायरी' },
  { to: '/friendship-shayari', label: 'दोस्ती शायरी' },
  { to: '/motivational-shayari', label: 'मोटिवेशनल शायरी' },
  { to: '/good-morning-images', label: 'गुड मॉर्निंग' },
  { to: '/good-night-images', label: 'गुड नाइट' },
  { to: '/birthday-wishes', label: 'बर्थडे विशेज' },
  { to: '/anniversary-wishes', label: 'एनिवर्सरी' },
  { to: '/category/festival', label: 'त्योहार' },
];

const DOAIDE_PRODUCTS = [
  { href: 'https://doaide.com', label: 'DoAide Home' },
  { href: 'https://shayari.doaide.com', label: 'Shayari' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--da-bg)] flex flex-col">
      <header className="bg-[var(--da-bg)] shadow-sm sticky top-0 z-50 border-b border-[var(--da-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-lg sm:text-xl text-primary-500">DoAide</span>
              <span className="text-gray-400 font-light text-lg">|</span>
              <span className="font-semibold text-lg sm:text-xl text-[var(--da-text)]">Shayari</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--da-text-secondary)] hover:text-primary-500 hover:bg-primary-50 transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
            <Link to="/search" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--da-surface)] text-[var(--da-text-secondary)] text-sm hover:bg-primary-50 transition-colors border border-[var(--da-border)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              खोजें...
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-[var(--da-text-secondary)] hover:bg-primary-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
          {menuOpen && (
            <nav className="md:hidden pb-3 border-t border-[var(--da-border)] pt-2">
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--da-text-secondary)] hover:text-primary-500 hover:bg-primary-50">
                  {label}
                </Link>
              ))}
              <Link to="/search" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--da-text-secondary)] hover:text-primary-500 hover:bg-primary-50">
                🔍 खोजें
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[var(--da-footer-bg)] text-[var(--da-footer-text)] mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-3">शायरी</h3>
              <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.slice(0, 4).map(({ to, label }) => (
                  <li key={to}><Link to={to} className="hover:text-primary-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">शुभकामनाएं</h3>
              <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.slice(4).map(({ to, label }) => (
                  <li key={to}><Link to={to} className="hover:text-primary-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">DoAide Products</h3>
              <ul className="space-y-2 text-sm">
                {DOAIDE_PRODUCTS.map(({ href, label }) => (
                  <li key={href}><a href={href} className="hover:text-primary-400 transition-colors">{label}</a></li>
                ))}
              </ul>
              <p className="text-sm text-[var(--da-footer-text)] mt-4">हिंदी शायरी, गुड मॉर्निंग मैसेज, लव कोट्स और शुभकामनाएं। कॉपी करें और WhatsApp पर शेयर करें।</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--da-footer-text)]">
            <p>&copy; {new Date().getFullYear()} DoAide | Shayari. सर्वाधिकार सुरक्षित।</p>
            <a href="https://doaide.com" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors text-xs font-medium">
              <svg className="w-3.5 h-3.5" viewBox="0 0 100 100" fill="currentColor"><rect width="100" height="100" rx="20"/><text x="50" y="68" fontFamily="Inter, Arial, sans-serif" fontSize="40" fontWeight="700" fill="white" textAnchor="middle">Da</text></svg>
              A DoAide Product
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
