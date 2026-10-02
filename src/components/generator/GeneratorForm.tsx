import React, { useState } from 'react';
import { Search, ChevronDown, Plus, X, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const INDUSTRIES = [
  'Technology', 'Fashion', 'Food & Restaurant', 'Beauty', 'Fitness', 'Finance',
  'Real Estate', 'Education', 'E-commerce', 'Marketing', 'Construction',
  'Logistics', 'Travel', 'Healthcare', 'Entertainment', 'Agriculture',
  'Professional Services', 'Other'
];

const AUDIENCES = [
  'General Audience', 'Students', 'Young Adults', 'Professionals', 'Families',
  'Businesses', 'Luxury Customers', 'Budget Customers'
];

const TONES = [
  'Modern', 'Professional', 'Luxury', 'Friendly', 'Creative', 'Bold',
  'Minimal', 'Playful', 'Tech', 'Elegant'
];

const STYLES = [
  'Short & Catchy', 'Professional', 'Premium', 'Invented Word', 'Two Words',
  'One Word', 'Descriptive', 'Creative', 'Local/Regional'
];

const RESULTS_COUNT = [10, 20, 30, 50];

interface GeneratorFormProps {
  onGenerate: (params: any) => void;
  isLoading: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [audience, setAudience] = useState('General Audience');
  const [tone, setTone] = useState('Modern');
  const [style, setStyle] = useState('Short & Catchy');
  const [resultCount, setResultCount] = useState(20);
  const [location, setLocation] = useState('');

  const handleAddKeyword = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      description,
      industry,
      keywords,
      audience,
      tone,
      style,
      location,
      resultCount
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex justify-between">
            Business/Brand Description
            <span className="text-xs font-normal text-slate-400">Required</span>
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does your business do? Example: Online clothing store for affordable streetwear."
            className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Industry */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Industry</label>
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Keywords</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword(e)}
                  placeholder="e.g. urban, premium"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAddKeyword()}
                className="p-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {keywords.map(kw => (
                  <span key={kw} className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                    {kw}
                    <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Target Audience</label>
            <div className="relative">
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {AUDIENCES.map(aud => <option key={aud} value={aud}>{aud}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Brand Tone</label>
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {TONES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Naming Style */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Naming Style</label>
            <div className="relative">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Number of Results */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Number of Results</label>
            <div className="relative">
              <select
                value={resultCount}
                onChange={(e) => setResultCount(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {RESULTS_COUNT.map(count => <option key={count} value={count}>{count}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Optional Location */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Optional Location / Region</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Global, USA, Nigeria, London"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* CTA */}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Names...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Generate Business Names
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneratorForm;
