import React, { useState } from 'react';
import GeneratorForm from '../components/generator/GeneratorForm';
import ResultCard from '../components/generator/ResultCard';
import FilterBar from '../components/generator/FilterBar';
import { useFavorites } from '../hooks/useFavorites';
import { BusinessName } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

import SEO from '../components/SEO';

const Home = () => {
  const [results, setResults] = useState<BusinessName[]>([]);
  const [filteredResults, setFilteredResults] = useState<BusinessName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleGenerate = async (params: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResults(data.names);
      setFilteredResults(data.names);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Generator Error:', err);
      let userMessage = err.message || 'Something went wrong. Please try again.';
      
      // Handle environmental/extension errors that might be misreported
      if (userMessage.includes('MetaMask') || userMessage.includes('ethereum')) {
        userMessage = 'A browser extension (like MetaMask) is interfering with the request. Please try disabling it or using a different browser.';
      } else if (userMessage === 'Failed to fetch') {
        userMessage = 'Unable to reach the server. Please check your internet connection or try again later.';
      }
      
      setError(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: string[]) => {
    let next = [...results];
    if (filters.includes('short')) {
      next = next.filter(n => n.name.length < 10);
    }
    if (filters.includes('one-word')) {
      next = next.filter(n => !n.name.includes(' '));
    }
    if (filters.includes('two-words')) {
      next = next.filter(n => n.name.trim().split(/\s+/).length === 2);
    }
    if (filters.includes('premium')) {
      next = next.filter(n => n.style.toLowerCase().includes('premium'));
    }
    if (filters.includes('creative')) {
      next = next.filter(n => n.style.toLowerCase().includes('creative'));
    }
    if (filters.includes('professional')) {
      next = next.filter(n => n.style.toLowerCase().includes('professional'));
    }
    setFilteredResults(next);
  };

  return (
    <div className="flex flex-col">
      <SEO 
        title="NameForge – AI Business Name Generator"
        description="Generate memorable, brandable business names tailored to your industry and keywords. Find your perfect brand identity with NameForge."
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.05)_0,rgba(255,255,255,0)_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
                <Sparkles className="w-3 h-3" />
                AI-Powered Business Naming
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Find the Perfect <span className="text-indigo-600">Business Name</span> in Seconds
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Generate memorable, brandable business names tailored to your industry, keywords, audience, and brand style.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#generator" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2 group">
                  Start Generating
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/how-it-works" className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
                  How it Works
                </a>
              </div>
            </motion.div>

            <motion.div
              id="generator"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              
              <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/9] bg-slate-100 relative group">
                <img 
                  src="/src/assets/images/hero_workspace_vision_1790947420144.jpg" 
                  alt="Modern business workspace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000'; // External fallback if local fails during dev
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {(results.length > 0 || isLoading || error) && (
          <section id="results" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Generated Suggestions</h2>
                  <p className="text-slate-600">
                    We've found {results.length} names based on your criteria. Save your favorites!
                  </p>
                </div>
                {results.length > 0 && <FilterBar onFilterChange={handleFilterChange} />}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl mb-8">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((name, idx) => (
                  <ResultCard
                    key={idx}
                    nameObj={name}
                    isFavorite={isFavorite(name.name)}
                    onToggleFavorite={() => toggleFavorite(name)}
                  />
                ))}
              </div>

              {results.length > 0 && (
                <div className="mt-16 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center text-center">
                  <ShieldCheck className="w-12 h-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Trademark Reminder</h3>
                  <p className="text-slate-600 max-w-2xl mb-6">
                    Generated names are suggestions only. Before using a name commercially, check domain availability, trademarks, and your country's business-registration requirements.
                  </p>
                  <a href="/how-to-check-availability" className="text-indigo-600 font-bold hover:underline">
                    Learn how to verify a name →
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use NameForge?</h2>
            <p className="text-slate-600 text-lg">
              Choosing a name is one of the most important decisions for your new venture. We make it easy, fast, and scientific.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: 'AI-Powered Precision',
                desc: 'Our intelligent algorithms understand your industry and brand tone to generate highly relevant ideas.'
              },
              {
                icon: Globe,
                title: 'Domain & Global Ready',
                desc: 'We check for potential brandability and provide instant links to verify domain availability across multiple extensions.'
              },
              {
                icon: ShieldCheck,
                title: 'Brand Consistency',
                desc: 'Select from various naming styles—from descriptive to invented—to match your desired market positioning.'
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Popular Name Generators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Startup Names', 'Tech Names', 'Fashion Names', 'Restaurant Names',
              'Online Business Names', 'Beauty Brand Names', 'Real Estate Names', 'Consulting Names'
            ].map((cat) => (
              <a
                key={cat}
                href={`/${cat.toLowerCase().replace(/\s+/g, '-')}-generator`}
                className="p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 font-semibold text-center transition-all shadow-sm"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              {
                q: 'What makes a good business name?',
                a: 'A good business name is easy to remember, easy to pronounce, and reflects the brand personality. It should ideally be short, unique, and have an available domain name.'
              },
              {
                q: 'Are generated business names unique?',
                a: 'We generate a wide variety of names based on your specific keywords and description. While we aim for uniqueness, you must always verify trademarks and registration availability.'
              },
              {
                q: 'Can I legally use a generated business name?',
                a: 'Generation is just the first step. You should conduct a formal trademark search and check local business registration databases before committing to a name.'
              }
            ].map((item, i) => (
              <div key={i} className="border-b border-slate-100 pb-8 last:border-0">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
