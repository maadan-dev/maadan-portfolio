import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/utils/ScrollToTop';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const WritingPage = lazy(() => import('./pages/WritingPage').then(m => ({ default: m.WritingPage })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

import { DeveloperTerminal } from './components/ui/DeveloperTerminal';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
        <DeveloperTerminal />
      </Router>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
