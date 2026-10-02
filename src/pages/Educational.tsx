import React from 'react';
import { ShieldCheck, Globe, Search, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

const Educational = () => {
  return (
    <div className="py-20 lg:py-32 bg-white">
      <SEO 
        title="Business Name Availability Guide – NameForge"
        description="Learn how to check if your business name is available. A comprehensive guide on domains, trademarks, and business registration."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
          How to Check if a Business Name Is Available
        </h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          Generating a name is just the beginning. Before you print business cards or launch your website, you need to ensure the name is legally available and brandable.
        </p>

        <div className="space-y-16">
          {/* Step 1 */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Domain Name Check</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              In today's digital world, your domain is your identity. A great name without a matching .com can be a major hurdle.
            </p>
            <ul className="space-y-4 mb-6">
              {[
                'Check for .com, .net, and industry-specific extensions.',
                'Look for short, memorable variations if the exact match is taken.',
                'Avoid using hyphens or numbers if possible.'
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Step 2 */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Trademark Search</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              This is the most critical legal step. Using a trademarked name can lead to expensive legal battles and a forced rebrand.
            </p>
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Critical Step</h4>
                <p className="text-amber-800 text-sm">
                  Always search the USPTO database (USA) or your local trademark office (e.g., UKIPO, EUIPO) for existing trademarks in your industry.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Business Registration</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Check with your local Secretary of State or equivalent government body to see if the name is available for registration in your jurisdiction.
            </p>
          </section>

          {/* Step 4 */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Social Media Handles</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Verify if the name is available on major platforms like Twitter, Instagram, LinkedIn, and Facebook. Consistency across platforms helps with brand recognition.
            </p>
          </section>
        </div>

        <div className="mt-24 p-12 bg-slate-50 rounded-3xl border border-slate-100">
          <BookOpen className="w-12 h-12 text-indigo-600 mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need more help?</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Our blog contains dozens of articles on naming strategy, brand identity, and startup growth.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '10 Common Naming Mistakes',
              'How to Create a Brand Identity',
              'The Psychology of Color in Naming',
              'Invented vs. Descriptive Names'
            ].map(article => (
              <a key={article} href="/blog" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 transition-colors font-semibold text-slate-700">
                {article}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Educational;
