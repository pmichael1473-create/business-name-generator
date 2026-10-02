import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import ResultCard from '../components/generator/ResultCard';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trash2, Download, Copy, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const exportAsTxt = () => {
    const content = favorites.map(f => `${f.name}: ${f.description}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nameforge-favorites.txt';
    a.click();
  };

  const copyAll = () => {
    const content = favorites.map(f => f.name).join(', ');
    navigator.clipboard.writeText(content);
    alert('All names copied to clipboard!');
  };

  if (favorites.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-8">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">No Favorites Yet</h1>
        <p className="text-slate-500 max-w-md mb-10 leading-relaxed">
          You haven't saved any business names yet. Start generating and click the heart icon to save ideas you love.
        </p>
        <a
          href="/"
          className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Zap className="w-5 h-5 fill-current" />
          Start Generating
        </a>
      </div>
    );
  }

  return (
    <div className="py-20 lg:py-32 bg-slate-50 min-h-screen">
      <SEO 
        title="My Saved Names – NameForge"
        description="View and manage your favorite business name ideas. Export your saved names or copy them to your clipboard."
        noIndex={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">My Favorites</h1>
            </div>
            <p className="text-slate-600">
              You have saved {favorites.length} business names. Export or copy them for your records.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyAll}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </button>
            <button
              onClick={exportAsTxt}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export TXT
            </button>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {favorites.map((name) => (
              <ResultCard
                key={name.name}
                nameObj={name}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(name)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 p-8 bg-white rounded-2xl border border-slate-200 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Next Steps?</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Ready to choose one of these names? Make sure to check trademark availability and register your domain as soon as possible.
          </p>
          <a href="/how-to-check-availability" className="text-indigo-600 font-bold hover:underline">
            View our Naming Checklist →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
