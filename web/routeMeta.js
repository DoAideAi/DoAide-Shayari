/**
 * Route metadata for SEO prerendering.
 * Used by prerender.js to inject per-route title, canonical, description,
 * h1, OG/Twitter meta, and JSON-LD into static HTML at build time.
 */

import { SEO_DATA } from './src/utils/seo.js';

const SITE = 'https://shayari.doaide.com';
const SITE_NAME = 'DoAide | Shayari';

function collectionJsonLd({ name, description, url }) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE}${url}`,
    inLanguage: ['hi', 'en'],
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE },
  });
}

function webAppJsonLd({ name, description, url }) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE}${url}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    inLanguage: ['hi', 'en'],
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE },
  });
}

function articleJsonLd({ headline, description, url }) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: `${SITE}${url}`,
    inLanguage: ['hi', 'en'],
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().slice(0, 10),
  });
}

export const routes = {
  '/': {
    title: `${SITE_NAME} - हिंदी शायरी, गुड मॉर्निंग मैसेज, लव कोट्स`,
    description: 'हिंदी शायरी, गुड मॉर्निंग इमेज, गुड नाइट मैसेज, लव कोट्स, बर्थडे विशेज और शुभकामनाएं। कॉपी और शेयर करें WhatsApp पर।',
    h1: 'हिंदी शायरी और शुभकामनाएं',
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: 'डूएड शायरी',
      url: SITE,
      description: 'Hindi Shayari, Good Morning Messages, Love Quotes and Wishes',
      inLanguage: ['hi', 'en'],
      publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    }),
  },
  // Landing pages share metadata with the client-side SEOLandingPage
  ...Object.fromEntries(
    Object.entries(SEO_DATA).map(([slug, seo]) => [
      `/${slug}`,
      {
        title: seo.title,
        description: seo.description,
        h1: seo.h1,
        jsonLd: collectionJsonLd({ name: seo.h1En, description: seo.description, url: `/${slug}` }),
      },
    ]),
  ),
  '/festivals': {
    title: 'Festival Messages in Hindi | त्योहारों की शुभकामनाएं - DoAide Shayari',
    description: 'दिवाली, होली, ईद, क्रिसमस, रक्षाबंधन, नवरात्रि — सभी त्योहारों की शुभकामनाएं हिंदी में। WhatsApp पर शेयर करें।',
    h1: 'त्योहारों की शुभकामनाएं',
    jsonLd: collectionJsonLd({ name: 'Festival Messages in Hindi', description: 'दिवाली, होली, ईद, क्रिसमस — सभी त्योहारों की शुभकामनाएं हिंदी में', url: '/festivals' }),
  },
  '/occasion-generator': {
    title: 'Birthday & Anniversary Message Generator in Hindi | DoAide Shayari',
    description: 'बर्थडे और एनिवर्सरी मैसेज जनरेटर — नाम और रिश्ता डालें, कस्टम हिंदी संदेश पाएं। WhatsApp पर शेयर करें।',
    h1: 'बर्थडे और एनिवर्सरी मैसेज जनरेटर',
    jsonLd: webAppJsonLd({ name: 'Birthday & Anniversary Message Generator in Hindi', description: 'बर्थडे और एनिवर्सरी मैसेज जनरेटर — नाम और रिश्ता डालें, कस्टम हिंदी संदेश पाएं', url: '/occasion-generator' }),
  },
  '/quote-card': {
    title: 'Shayari Image Card Maker | शायरी इमेज कार्ड बनाएं - DoAide Shayari',
    description: 'शायरी इमेज कार्ड बनाएं — बैकग्राउंड, फॉन्ट चुनें और 1080x1080 इमेज डाउनलोड करें। WhatsApp, Instagram पर शेयर करें।',
    h1: 'शायरी इमेज कार्ड बनाएं',
    jsonLd: webAppJsonLd({ name: 'Shayari Image Card Maker', description: 'शायरी इमेज कार्ड बनाएं — बैकग्राउंड, फॉन्ट चुनें और 1080x1080 इमेज डाउनलोड करें', url: '/quote-card' }),
  },
  '/categories': {
    title: 'सभी कैटेगरी | All Categories - DoAide Shayari',
    description: 'शायरी, शुभकामनाएं, त्योहार, बर्थडे विशेज — सभी कैटेगरी एक जगह। Browse all Hindi Shayari and wishes categories.',
    h1: 'सभी कैटेगरी',
    jsonLd: collectionJsonLd({ name: 'All Categories - DoAide Shayari', description: 'शायरी, शुभकामनाएं, त्योहार, बर्थडे विशेज — सभी कैटेगरी एक जगह', url: '/categories' }),
  },
  '/hindi-shayari-guide': {
    title: 'Hindi Shayari Guide 2026 | हिंदी शायरी गाइड - DoAide Shayari',
    description: 'हिंदी शायरी की पूरी गाइड — शायरी क्या है, शायरी कैसे लिखें, शायरी के प्रकार। Hindi Shayari complete guide.',
    h1: 'हिंदी शायरी गाइड 2026',
    jsonLd: articleJsonLd({ headline: 'Hindi Shayari Guide 2026 | हिंदी शायरी गाइड', description: 'हिंदी शायरी की पूरी गाइड — शायरी क्या है, शायरी कैसे लिखें, शायरी के प्रकार', url: '/hindi-shayari-guide' }),
  },
  '/generate': {
    title: 'AI शायरी जनरेटर | AI Message Generator - DoAide Shayari',
    description: 'AI शायरी जनरेटर — कैटेगरी चुनें, कस्टम शायरी और संदेश बनाएं। AI-powered Hindi Shayari and message generator.',
    h1: 'AI शायरी जनरेटर',
    jsonLd: webAppJsonLd({ name: 'AI Shayari Generator', description: 'AI शायरी जनरेटर — कैटेगरी चुनें, कस्टम शायरी और संदेश बनाएं', url: '/generate' }),
  },
};

export const SITE_URL = SITE;
export const SITE_NAME_CONST = SITE_NAME;
