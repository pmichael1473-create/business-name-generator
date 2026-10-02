import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Educational from './pages/Educational';
import Legal from './pages/Legal';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/how-to-check-availability" element={<Educational />} />
          <Route path="/how-it-works" element={<Educational />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/disclaimer" element={<Legal type="disclaimer" />} />
          <Route path="/startup-name-generator" element={<Home />} />
          <Route path="/tech-company-name-generator" element={<Home />} />
          <Route path="/fashion-brand-name-generator" element={<Home />} />
          <Route path="/blog" element={<Educational />} />
          {/* Fallback for SEO pages */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
