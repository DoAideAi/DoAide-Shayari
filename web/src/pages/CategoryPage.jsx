import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useContent } from '../hooks/useContent';

const CATEGORY_LABELS = {
  shayari: { hi: 'शायरी', en: 'Shayari' },
  good_morning: { hi: 'गुड मॉर्निंग', en: 'Good Morning' },
  good_night: { hi: 'गुड नाइट', en: 'Good Night' },
  love: { hi: 'लव कोट्स', en: 'Love Quotes' },
  birthday: { hi: 'बर्थडे विशेज', en: 'Birthday Wishes' },
  anniversary: { hi: 'एनिवर्सरी', en: 'Anniversary' },
  festival: { hi: 'त्योहार', en: 'Festival Wishes' },
};

const SUBCATEGORY_LABELS = {
  love: 'लव / Love',
  sad: 'सैड / Sad',
  friendship: 'दोस्ती / Friendship',
  motivational: 'मोटिवेशनल / Motivational',
  attitude: 'एटीट्यूड / Attitude',
  funny: 'फ़नी / Funny',
  diwali: 'दिवाली / Diwali',
  holi: 'होली / Holi',
  eid: 'ईद / Eid',
  raksha_bandhan: 'रक्षाबंधन / Raksha Bandhan',
  navratri: 'नवरात्रि / Navratri',
  christmas: 'क्रिसमस / Christmas',
  new_year: 'नया साल / New Year',
};

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  const [page, setPage] = useState(1);

  const params = { page, limit: 20, random: true };
  if (subcategory) params.subcategory = subcategory;

  const { data, isLoading } = useContent(category, params);
  const label = CATEGORY_LABELS[category] || { hi: category, en: category };
  const subLabel = subcategory ? SUBCATEGORY_LABELS[subcategory] : null;
  const pageTitle = subLabel
    ? `${subLabel} - ${label.hi} | DoAide Shayari`
    : `${label.hi} - ${label.en} | DoAide Shayari`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={`${label.hi} (${label.en}) - DoAide Shayari पर पढ़ें और WhatsApp पर शेयर करें।`}
        url={`/category/${category}${subcategory ? `?subcategory=${subcategory}` : ''}`}
      />

      <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-8 sm:py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-white/70 mb-3">
            <Link to="/" className="hover:text-white">होम</Link>
            <span className="mx-2">›</span>
            <span>{label.hi}</span>
            {subLabel && <><span className="mx-2">›</span><span>{subLabel}</span></>}
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold font-hindi">
            {subLabel || label.hi}
          </h1>
        </div>
      </section>

      {category === 'shayari' && !subcategory && (
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(SUBCATEGORY_LABELS).slice(0, 6).map(([key, val]) => (
              <Link
                key={key}
                to={`/category/shayari?subcategory=${key}`}
                className="px-3 py-1.5 rounded-full text-sm bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
              >
                {val}
              </Link>
            ))}
          </div>
        </div>
      )}

      {category === 'festival' && !subcategory && (
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(SUBCATEGORY_LABELS).slice(6).map(([key, val]) => (
              <Link
                key={key}
                to={`/category/festival?subcategory=${key}`}
                className="px-3 py-1.5 rounded-full text-sm bg-saffron-50 text-saffron-700 hover:bg-saffron-100 transition-colors"
              >
                {val}
              </Link>
            ))}
          </div>
        </div>
      )}

      <section className="max-w-4xl mx-auto px-4 py-8">
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
              <p className="text-center text-gray-500 py-8 font-hindi">कोई कंटेंट नहीं मिला।</p>
            )}
            {data && (
              <Pagination page={page} pages={data.pages} onPageChange={setPage} />
            )}
          </>
        )}
      </section>
    </>
  );
}
