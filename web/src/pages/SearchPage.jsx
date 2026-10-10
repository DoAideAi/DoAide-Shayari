import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SearchBar from '../components/SearchBar';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useSearch } from '../hooks/useContent';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [q]);

  const { data, isLoading } = useSearch(q, page);

  return (
    <>
      <SEOHead
        title={q ? `"${q}" की खोज | DoAide Shayari` : 'खोजें | DoAide Shayari'}
        description="हिंदी शायरी और शुभकामनाएं खोजें।"
        url={`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`}
      />

      <section className="bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-hindi text-xl font-bold text-gray-800 mb-4 text-center">खोजें</h1>
          <SearchBar />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        {q && (
          <p className="text-sm text-gray-500 mb-4">
            &quot;{q}&quot; के लिए {data?.total || 0} नतीजे
          </p>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {data?.items?.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
            {data?.items?.length === 0 && q && (
              <p className="text-center text-gray-500 py-8 font-hindi">कोई नतीजा नहीं मिला। कुछ और खोजें।</p>
            )}
            {data && (
              <Pagination page={page} pages={Math.ceil((data.total || 0) / 20)} onPageChange={setPage} />
            )}
          </>
        )}
      </section>
    </>
  );
}
