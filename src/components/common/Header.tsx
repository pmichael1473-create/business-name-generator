import React from 'react';
import { Menu, X, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Generator', href: '/' },
    { name: 'Favorites', href: '/favorites' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Zone 1: Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 group">
              <Zap className="w-6 h-6 text-indigo-600 fill-indigo-600 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold tracking-tight text-slate-900">NameForge</span>
            </a>
          </div>

          {/* Zone 2: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/favorites"
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="My Favorites"
            >
              <Heart className="w-5 h-5" />
            </a>
            <a
              href="#generator"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Generate Names
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="/favorites"
                  className="flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  My Favorites
                </a>
                <a
                  href="#generator"
                  className="w-full text-center px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Generate Names
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
