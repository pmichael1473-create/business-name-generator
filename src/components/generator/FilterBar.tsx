import React from 'react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const filters = [
    { id: 'short', label: 'Short Names (< 10 chars)' },
    { id: 'one-word', label: 'One Word' },
    { id: 'two-words', label: 'Two Words' },
    { id: 'premium', label: 'Premium' },
    { id: 'creative', label: 'Creative' },
    { id: 'professional', label: 'Professional' },
  ];

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      onFilterChange(next);
      return next;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 py-6 border-b border-slate-100 mb-8">
      <span className="w-full text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Filter Results
      </span>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => toggleFilter(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilters.includes(filter.id)
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/30'
          }`}
        >
          {filter.label}
        </button>
      ))}
      <button
        onClick={() => {
          setActiveFilters([]);
          onFilterChange([]);
        }}
        className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterBar;
