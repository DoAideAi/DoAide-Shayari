import SEOHead from '../components/SEOHead';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDaily, useTrending } from '../hooks/useContent';

export default function HomePage() {
  const { data: daily, isLoading } = useDaily();
  const { data: trending } = useTrending(6);

  return (
    <>
      <SEOHead
        title="DoAide | Shayari - हिंदी शायरी, गुड मॉर्निंग मैसेज, लव कोट्स और शुभकामनाएं"
        description="बेहतरीन हिंदी शायरी, गुड मॉर्निंग इमेज, गुड नाइट मैसेज, लव कोट्स, बर्थडे विशेज। कॉपी करें और WhatsApp पर शेयर करें।"
        url="/"
      />

      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-teal-400 text-white py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className="font-hindi">हिंदी शायरी और शुभकामनाएं</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-6">
            Hindi Shayari, Good Morning Messages, Love Quotes & Wishes
          </p>
          <SearchBar className="max-w-lg mx-auto" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="font-hindi text-xl sm:text-2xl font-bold text-[var(--da-text)] mb-6 text-center">
          कैटेगरी चुनें <span className="text-[var(--da-text-secondary)] font-normal text-base">| Browse Categories</span>
        </h2>
        <CategoryGrid />
      </section>

      {trending?.items?.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-4">
          <h2 className="font-hindi text-xl sm:text-2xl font-bold text-[var(--da-text)] mb-6 text-center">
            🔥 ट्रेंडिंग शायरी <span className="text-[var(--da-text-secondary)] font-normal text-base">| Trending Now</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {trending.items.slice(0, 6).map((item) => (
              <ContentCard key={`trend-${item.id}`} item={item} />
            ))}
          </div>
        </section>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : daily && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="font-hindi text-xl sm:text-2xl font-bold text-[var(--da-text)] mb-6 text-center">
            आज की ताज़ा शायरी <span className="text-[var(--da-text-secondary)] font-normal text-base">| Today&apos;s Fresh Content</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.values(daily).flat().slice(0, 6).map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
