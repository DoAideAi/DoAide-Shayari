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
  { to: '/good-morning-images', label: 'गुड मॉर्निंग' },
  { to: '/good-night-images', label: 'गुड नाइट' },
  { to: '/birthday-wishes', label: 'बर्थडे विशेज' },
  { to: '/anniversary-wishes', label: 'एनिवर्सरी' },
  { to: '/category/festival', label: 'त्योहार' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl">🪷</span>
              <span className="font-bold text-lg sm:text-xl text-primary-600">DoAide <span className="text-gray-800">Shayari</span></span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
            <Link to="/search" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-sm hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              खोजें...
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
          {menuOpen && (
            <nav className="md:hidden pb-3 border-t border-gray-100 pt-2">
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50">
                  {label}
                </Link>
              ))}
              <Link to="/search" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50">
                🔍 खोजें
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-3">शायरी</h3>
              <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.slice(0, 4).map(({ to, label }) => (
                  <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">शुभकामनाएं</h3>
              <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.slice(4).map(({ to, label }) => (
                  <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">DoAide Shayari</h3>
              <p className="text-sm text-gray-400">हिंदी शायरी, गुड मॉर्निंग मैसेज, लव कोट्स और शुभकामनाएं। कॉपी करें और WhatsApp पर शेयर करें।</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} DoAide Shayari. सर्वाधिकार सुरक्षित।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
