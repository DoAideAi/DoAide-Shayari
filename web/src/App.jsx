import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ContentDetailPage from './pages/ContentDetailPage';
import SearchPage from './pages/SearchPage';
import GeneratePage from './pages/GeneratePage';
import SEOLandingPage from './pages/SEOLandingPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/good-morning-images" element={<SEOLandingPage slug="good-morning-images" />} />
        <Route path="/good-night-images" element={<SEOLandingPage slug="good-night-images" />} />
        <Route path="/hindi-shayari" element={<SEOLandingPage slug="hindi-shayari" />} />
        <Route path="/love-shayari" element={<SEOLandingPage slug="love-shayari" />} />
        <Route path="/sad-shayari" element={<SEOLandingPage slug="sad-shayari" />} />
        <Route path="/friendship-shayari" element={<SEOLandingPage slug="friendship-shayari" />} />
        <Route path="/birthday-wishes" element={<SEOLandingPage slug="birthday-wishes" />} />
        <Route path="/anniversary-wishes" element={<SEOLandingPage slug="anniversary-wishes" />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/content/:id" element={<ContentDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
