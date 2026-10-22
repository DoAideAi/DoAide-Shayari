import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useContent } from '../hooks/useContent';

const FESTIVALS = [
  { key: 'diwali', emoji: '🪔', hi: 'दिवाली', en: 'Diwali', gradient: 'from-amber-500 to-orange-600', months: [10, 11] },
  { key: 'holi', emoji: '🎨', hi: 'होली', en: 'Holi', gradient: 'from-pink-500 to-purple-500', months: [2, 3] },
  { key: 'eid', emoji: '🌙', hi: 'ईद', en: 'Eid', gradient: 'from-emerald-500 to-teal-600', months: [3, 4, 6, 7] },
  { key: 'christmas', emoji: '🎄', hi: 'क्रिसमस', en: 'Christmas', gradient: 'from-red-500 to-green-600', months: [12] },
  { key: 'raksha_bandhan', emoji: '🧵', hi: 'रक्षाबंधन', en: 'Raksha Bandhan', gradient: 'from-yellow-400 to-pink-500', months: [7, 8] },
  { key: 'navratri', emoji: '🔱', hi: 'नवरात्रि', en: 'Navratri', gradient: 'from-red-500 to-orange-500', months: [3, 4, 9, 10] },
  { key: 'new_year', emoji: '🎉', hi: 'नया साल', en: 'New Year', gradient: 'from-indigo-500 to-purple-600', months: [1, 12] },
];

function getUpcoming() {
  const m = new Date().getMonth() + 1;
  const sorted = [...FESTIVALS].sort((a, b) => {
    const aNext = a.months.find((x) => x >= m) ?? a.months[0] + 12;
    const bNext = b.months.find((x) => x >= m) ?? b.months[0] + 12;
    return aNext - bNext;
  });
  return sorted;
}

export default function FestivalPage() {
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(1);
  const festivals = getUpcoming();

  const { data, isLoading } = useContent('festival', {
    subcategory: active || undefined,
    page,
    limit: 20,
    random: true,
  });

  return (
    <>
      <SEOHead
        title="Festival Messages in Hindi | त्योहारों की शुभकामनाएं - DoAide Shayari"
        description="दिवाली, होली, ईद, क्रिसमस, रक्षाबंधन, नवरात्रि — सभी त्योहारों की शुभकामनाएं हिंदी में। WhatsApp पर शेयर करें।"
        url="/festivals"
      />

      <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white">होम</Link>
            <span className="mx-2">›</span>
            <span>त्योहार</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="font-hindi">🪔 त्योहारों की शुभकामनाएं</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90">Festival Wishes & Messages in Hindi</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => { setActive(null); setPage(1); }}
            className={`rounded-2xl p-4 text-center transition-all shadow-md ${
              active === null
                ? 'ring-2 ring-primary-500 bg-gradient-to-br from-primary-500 to-teal-500 text-white scale-105'
                : 'bg-[var(--da-surface)] text-[var(--da-text)] border border-[var(--da-border)] hover:scale-105'
            }`}
          >
            <span className="text-2xl block mb-1">🎊</span>
            <span className="font-hindi font-semibold text-sm block">सभी त्योहार</span>
            <span className="text-xs opacity-80">All Festivals</span>
          </button>
          {festivals.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActive(f.key); setPage(1); }}
              className={`rounded-2xl p-4 text-center transition-all shadow-md ${
                active === f.key
                  ? `ring-2 ring-primary-500 bg-gradient-to-br ${f.gradient} text-white scale-105`
                  : 'bg-[var(--da-surface)] text-[var(--da-text)] border border-[var(--da-border)] hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{f.emoji}</span>
              <span className="font-hindi font-semibold text-sm block">{f.hi}</span>
              <span className="text-xs opacity-80">{f.en}</span>
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {data?.items?.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
            {data?.items?.length === 0 && (
              <p className="text-center text-[var(--da-text-secondary)] py-8 font-hindi">
                इस त्योहार के संदेश जल्द आ रहे हैं। कृपया बाद में देखें।
              </p>
            )}
            {data && <Pagination page={page} pages={data.pages} onPageChange={setPage} />}
          </>
        )}
      </section>
    </>
  );
}
