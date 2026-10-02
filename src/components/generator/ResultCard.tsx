import React from 'react';
import { Copy, Heart, Share2, ExternalLink, Check } from 'lucide-react';
import { BusinessName } from '../../types';
import { motion } from 'motion/react';

interface ResultCardProps {
  nameObj: BusinessName;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ nameObj, isFavorite, onToggleFavorite }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(nameObj.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: nameObj.name,
        text: `Check out this business name I found on NameForge: ${nameObj.name}`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const domainExtensions = ['.com', '.co', '.net', '.io', '.ng'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {nameObj.name}
        </h3>
        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-full transition-colors ${
            isFavorite ? 'bg-red-50 text-red-500' : 'text-slate-300 hover:text-red-500 hover:bg-slate-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
        {nameObj.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {nameObj.style}
        </span>
        <span aria-hidden="true" className="text-slate-200">·</span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {nameObj.industry}
        </span>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-50">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-500">Check Domains:</span>
          <div className="flex gap-1">
            {domainExtensions.map(ext => (
              <a
                key={ext}
                href={`https://www.namecheap.com/domains/registration/results/?domain=${nameObj.name}${ext}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                {ext}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-semibold transition-colors border border-transparent hover:border-indigo-100"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={onToggleFavorite}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-colors border border-transparent ${
              isFavorite
                ? 'bg-red-50 text-red-600 border-red-100'
                : 'bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 hover:border-red-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-semibold transition-colors border border-transparent hover:border-indigo-100"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
