import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BlogPost } from './pages/BlogPost';
import { WritingPage } from './pages/WritingPage';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/utils/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
