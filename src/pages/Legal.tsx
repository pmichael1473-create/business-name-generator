import React from 'react';
import SEO from '../components/SEO';

interface LegalProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      content: `
        At NameForge, we take your privacy seriously. This policy explains how we collect, use, and protect your data.
        
        1. Data Collection: We do not store any personal information unless you explicitly provide it. Generator inputs are processed to provide results and may be used in an anonymized way to improve our AI models.
        2. Local Storage: We use your browser's local storage to save your "Favorite" names. This data stays on your device and is never sent to our servers.
        3. Cookies: We use minimal cookies for essential functionality and basic analytics.
        4. Third Parties: We use the Google Gemini API to power our generator. Your inputs are sent to Google as part of this process.
      `
    },
    terms: {
      title: 'Terms of Service',
      content: `
        By using NameForge, you agree to these terms:
        
        1. Use of Service: You may use NameForge for personal and commercial business-naming purposes.
        2. AI Output: The names generated are produced by an AI. We do not guarantee their uniqueness or legal availability.
        3. Intellectual Property: You own the rights to the combination of words generated, but we do not guarantee that the names are free from third-party trademark claims.
        4. Prohibited Use: You may not use this service for generating offensive, illegal, or harmful content.
      `
    },
    disclaimer: {
      title: 'Legal Disclaimer',
      content: `
        NameForge provides name suggestions using artificial intelligence. 
        
        IMPORTANT: 
        1. We are not a legal service. 
        2. We do not conduct trademark searches or guarantee domain availability.
        3. The user is solely responsible for verifying the legality and availability of any name before using it commercially.
        4. NameForge is not a Web3 or cryptocurrency application. We do not use, require, or request connections to digital wallets like MetaMask.
        5. NameForge is not liable for any legal issues, branding costs, or damages arising from the use of generated names.
      `
    }
  };

  const selected = content[type];

  return (
    <div className="py-20 lg:py-32 bg-white min-h-screen">
      <SEO 
        title={`${selected.title} – NameForge`}
        description={`Read the ${selected.title.toLowerCase()} of NameForge to understand your rights and our obligations.`}
        noIndex={true}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 tracking-tight">
          {selected.title}
        </h1>
        <div className="prose prose-slate max-w-none">
          {selected.content.split('\n').map((line, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-6">
              {line.trim()}
            </p>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-400">
            Last updated: October 2, 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;
