import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '../components/SEOHead';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3081';

export default function ContentDetailPage() {
  const { id } = useParams();

  const { data: item, isLoading } = useQuery({
    queryKey: ['content-detail', id],
    queryFn: async () => {
      const categories = ['shayari', 'good_morning', 'good_night', 'love', 'birthday', 'anniversary', 'festival'];
      for (const cat of categories) {
        try {
          const res = await fetch(`${API_BASE}/api/content/${cat}/${id}`);
          if (res.ok) return res.json();
        } catch {}
      }
      throw new Error('Not found');
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!item) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <p className="text-[var(--da-text-secondary)] font-hindi text-lg">कंटेंट नहीं मिला</p>
      <Link to="/" className="text-primary-500 hover:underline mt-4 inline-block">होम पेज पर जाएं</Link>
    </div>
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    text: item.text_hindi,
    inLanguage: 'hi',
    author: item.author ? { '@type': 'Person', name: item.author } : undefined,
  };

  return (
    <>
      <SEOHead
        title={`${item.text_hindi.slice(0, 60)}... | DoAide Shayari`}
        description={item.text_transliteration.slice(0, 160)}
        url={`/content/${id}`}
        jsonLd={jsonLd}
      />

      <section className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <nav className="text-sm text-[var(--da-text-secondary)] mb-6">
          <Link to="/" className="hover:text-primary-500">होम</Link>
          <span className="mx-2">›</span>
          <Link to={`/category/${item.category}`} className="hover:text-primary-500">{item.category}</Link>
        </nav>
        <ContentCard item={item} showLink={false} />
      </section>
    </>
  );
}
