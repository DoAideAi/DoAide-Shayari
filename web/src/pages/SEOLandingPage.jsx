import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useContent } from '../hooks/useContent';
import { SEO_DATA, collectionPageJsonLd } from '../utils/seo';

const RELATED = {
  'good-morning-images': [
    { to: '/good-night-images', label: 'गुड नाइट मैसेज' },
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/hindi-shayari', label: 'हिंदी शायरी' },
  ],
  'good-night-images': [
    { to: '/good-morning-images', label: 'गुड मॉर्निंग मैसेज' },
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/sad-shayari', label: 'सैड शायरी' },
  ],
  'hindi-shayari': [
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/sad-shayari', label: 'सैड शायरी' },
    { to: '/friendship-shayari', label: 'दोस्ती शायरी' },
  ],
  'love-shayari': [
    { to: '/sad-shayari', label: 'सैड शायरी' },
    { to: '/hindi-shayari', label: 'हिंदी शायरी' },
    { to: '/anniversary-wishes', label: 'एनिवर्सरी विशेज' },
  ],
  'sad-shayari': [
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/friendship-shayari', label: 'दोस्ती शायरी' },
    { to: '/hindi-shayari', label: 'हिंदी शायरी' },
  ],
  'friendship-shayari': [
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/hindi-shayari', label: 'हिंदी शायरी' },
    { to: '/birthday-wishes', label: 'बर्थडे विशेज' },
  ],
  'birthday-wishes': [
    { to: '/anniversary-wishes', label: 'एनिवर्सरी विशेज' },
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/good-morning-images', label: 'गुड मॉर्निंग' },
  ],
  'anniversary-wishes': [
    { to: '/birthday-wishes', label: 'बर्थडे विशेज' },
    { to: '/love-shayari', label: 'लव शायरी' },
    { to: '/good-morning-images', label: 'गुड मॉर्निंग' },
  ],
};

export default function SEOLandingPage({ slug }) {
  const [page, setPage] = useState(1);
  const seo = SEO_DATA[slug];
  if (!seo) return null;

  const params = { page, limit: 20, random: true };
  if (seo.subcategory) params.subcategory = seo.subcategory;

  const { data, isLoading } = useContent(seo.category, params);
  const related = RELATED[slug] || [];

  const jsonLd = collectionPageJsonLd({
    name: seo.h1,
    description: seo.description,
    url: `/${slug}`,
    items: data?.items || [],
  });

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        url={`/${slug}`}
        jsonLd={jsonLd}
      />

      <section className="bg-gradient-to-br from-primary-500 to-saffron-500 text-white py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white">होम</Link>
            <span className="mx-2">›</span>
            <span>{seo.h1}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="font-hindi">{seo.h1}</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90">{seo.h1En}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="font-hindi text-lg sm:text-xl font-bold text-gray-800 mb-6">
          आज के ताज़ा संदेश <span className="text-gray-500 font-normal text-sm">| Today&apos;s Fresh Messages</span>
        </h2>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {data?.items?.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
            {data && (
              <Pagination page={page} pages={data.pages} onPageChange={setPage} />
            )}
          </>
        )}

        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="font-hindi text-lg font-bold text-gray-800 mb-4">
              और भी देखें <span className="text-gray-500 font-normal text-sm">| See More</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {related.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
