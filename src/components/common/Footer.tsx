import { useState, useEffect } from 'react';
import { Zap, Github, Twitter, Linkedin, Mail, CheckCircle2, XCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.ok ? setStatus('connected') : setStatus('error'))
      .catch(() => setStatus('error'));
  }, []);

  const sections = [
    {
      title: 'Tools',
      links: [
        { name: 'Business Name Generator', href: '/' },
        { name: 'Startup Name Generator', href: '/startup-name-generator' },
        { name: 'Tech Name Generator', href: '/tech-company-name-generator' },
        { name: 'Fashion Name Generator', href: '/fashion-brand-name-generator' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Naming Tips', href: '/blog' },
        { name: 'Trademark Search', href: '/how-to-check-availability' },
        { name: 'Domain Checker', href: '/how-to-check-availability' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Disclaimer', href: '/disclaimer' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-indigo-600 fill-indigo-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900">NameForge</span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Empowering entrepreneurs with memorable, brandable business names powered by artificial intelligence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="mailto:hello@nameforge.com" className="text-slate-400 hover:text-indigo-600 transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Nav Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-400">
              © {currentYear} NameForge. All rights reserved. Built with precision for entrepreneurs.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">System Status:</span>
              {status === 'checking' && <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />}
              {status === 'connected' && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-medium text-emerald-600">Secure & Connected</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] font-medium text-red-600">Connection Interrupted</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400">Made with ❤️ for the startup community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
