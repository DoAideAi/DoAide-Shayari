import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ContentDetailPage = lazy(() => import('./pages/ContentDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const GeneratePage = lazy(() => import('./pages/GeneratePage'));
const SEOLandingPage = lazy(() => import('./pages/SEOLandingPage'));
const FestivalPage = lazy(() => import('./pages/FestivalPage'));
const OccasionGeneratorPage = lazy(() => import('./pages/OccasionGeneratorPage'));
const QuoteCardPage = lazy(() => import('./pages/QuoteCardPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const BlogShayariPage = lazy(() => import('./pages/BlogShayariPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex justify-center py-16 text-[var(--da-text-secondary)]">लोड हो रहा है…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/good-morning-images" element={<SEOLandingPage slug="good-morning-images" />} />
          <Route path="/good-night-images" element={<SEOLandingPage slug="good-night-images" />} />
          <Route path="/hindi-shayari" element={<SEOLandingPage slug="hindi-shayari" />} />
          <Route path="/love-shayari" element={<SEOLandingPage slug="love-shayari" />} />
          <Route path="/sad-shayari" element={<SEOLandingPage slug="sad-shayari" />} />
          <Route path="/friendship-shayari" element={<SEOLandingPage slug="friendship-shayari" />} />
          <Route path="/motivational-shayari" element={<SEOLandingPage slug="motivational-shayari" />} />
          <Route path="/birthday-wishes" element={<SEOLandingPage slug="birthday-wishes" />} />
          <Route path="/anniversary-wishes" element={<SEOLandingPage slug="anniversary-wishes" />} />
          <Route path="/attitude-shayari" element={<SEOLandingPage slug="attitude-shayari" />} />
          <Route path="/funny-shayari" element={<SEOLandingPage slug="funny-shayari" />} />
          <Route path="/diwali-wishes" element={<SEOLandingPage slug="diwali-wishes" />} />
          <Route path="/holi-wishes" element={<SEOLandingPage slug="holi-wishes" />} />
          <Route path="/raksha-bandhan-wishes" element={<SEOLandingPage slug="raksha-bandhan-wishes" />} />
          <Route path="/navratri-wishes" element={<SEOLandingPage slug="navratri-wishes" />} />
          <Route path="/new-year-wishes" element={<SEOLandingPage slug="new-year-wishes" />} />
          <Route path="/christmas-wishes" element={<SEOLandingPage slug="christmas-wishes" />} />
          <Route path="/festivals" element={<FestivalPage />} />
          <Route path="/occasion-generator" element={<OccasionGeneratorPage />} />
          <Route path="/quote-card" element={<QuoteCardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/hindi-shayari-guide" element={<BlogShayariPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/content/:id" element={<ContentDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
