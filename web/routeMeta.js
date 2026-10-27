/**
 * Route metadata for SEO prerendering.
 * Used by prerender.js to inject per-route title, canonical, description,
 * h1, OG/Twitter meta, and JSON-LD into static HTML at build time.
 */

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
  '/good-morning-images': {
    title: 'Good Morning Images & Wishes in Hindi | गुड मॉर्निंग शुभकामनाएं - DoAide Shayari',
    description: 'गुड मॉर्निंग इमेज, सुप्रभात संदेश और शुभकामनाएं हिंदी में। WhatsApp पर शेयर करें। Good Morning images, wishes and messages in Hindi.',
    h1: 'गुड मॉर्निंग इमेज और शुभकामनाएं',
    jsonLd: collectionJsonLd({ name: 'Good Morning Images & Wishes in Hindi', description: 'गुड मॉर्निंग इमेज और सुप्रभात संदेश हिंदी में', url: '/good-morning-images' }),
  },
  '/good-night-images': {
    title: 'Good Night Images & Wishes in Hindi | शुभ रात्रि संदेश - DoAide Shayari',
    description: 'गुड नाइट इमेज, शुभ रात्रि संदेश और शुभकामनाएं हिंदी में। Good Night images and wishes in Hindi for WhatsApp.',
    h1: 'गुड नाइट इमेज और शुभ रात्रि संदेश',
    jsonLd: collectionJsonLd({ name: 'Good Night Images & Wishes in Hindi', description: 'गुड नाइट इमेज और शुभ रात्रि संदेश हिंदी में', url: '/good-night-images' }),
  },
  '/hindi-shayari': {
    title: 'Hindi Shayari | हिंदी शायरी संग्रह - प्यार, दर्द, दोस्ती - DoAide Shayari',
    description: 'बेहतरीन हिंदी शायरी - प्यार, दर्द, दोस्ती, एटीट्यूड शायरी। Hindi Shayari collection - Love, Sad, Friendship.',
    h1: 'हिंदी शायरी संग्रह',
    jsonLd: collectionJsonLd({ name: 'Hindi Shayari Collection', description: 'बेहतरीन हिंदी शायरी - प्यार, दर्द, दोस्ती, एटीट्यूड शायरी', url: '/hindi-shayari' }),
  },
  '/love-shayari': {
    title: 'Love Shayari in Hindi | लव शायरी - रोमांटिक शायरी - DoAide Shayari',
    description: 'बेहतरीन लव शायरी हिंदी में। रोमांटिक शायरी, मोहब्बत शायरी। Love Shayari, Romantic Shayari in Hindi.',
    h1: 'लव शायरी - रोमांटिक शायरी',
    jsonLd: collectionJsonLd({ name: 'Love Shayari in Hindi', description: 'बेहतरीन लव शायरी हिंदी में। रोमांटिक शायरी, मोहब्बत शायरी', url: '/love-shayari' }),
  },
  '/sad-shayari': {
    title: 'Sad Shayari in Hindi | दर्द भरी शायरी - DoAide Shayari',
    description: 'दर्द भरी शायरी, सैड शायरी हिंदी में। Sad Shayari, Dard Bhari Shayari in Hindi.',
    h1: 'दर्द भरी शायरी',
    jsonLd: collectionJsonLd({ name: 'Sad Shayari in Hindi', description: 'दर्द भरी शायरी, सैड शायरी हिंदी में', url: '/sad-shayari' }),
  },
  '/motivational-shayari': {
    title: 'Motivational Shayari in Hindi | मोटिवेशनल शायरी - जोश भरी शायरी - DoAide Shayari',
    description: 'मोटिवेशनल शायरी, जोश और हौसला बढ़ाने वाली शायरी हिंदी में। Motivational Shayari, Inspirational Shayari in Hindi.',
    h1: 'मोटिवेशनल शायरी - हौसला बढ़ाने वाली शायरी',
    jsonLd: collectionJsonLd({ name: 'Motivational Shayari in Hindi', description: 'मोटिवेशनल शायरी, जोश और हौसला बढ़ाने वाली शायरी हिंदी में', url: '/motivational-shayari' }),
  },
  '/friendship-shayari': {
    title: 'Friendship Shayari in Hindi | दोस्ती शायरी - DoAide Shayari',
    description: 'दोस्ती शायरी, यारी शायरी हिंदी में। Friendship Shayari, Dosti Shayari in Hindi.',
    h1: 'दोस्ती शायरी - यारी शायरी',
    jsonLd: collectionJsonLd({ name: 'Friendship Shayari in Hindi', description: 'दोस्ती शायरी, यारी शायरी हिंदी में', url: '/friendship-shayari' }),
  },
  '/birthday-wishes': {
    title: 'Birthday Wishes in Hindi | जन्मदिन की शुभकामनाएं - DoAide Shayari',
    description: 'जन्मदिन की शुभकामनाएं हिंदी में। Happy Birthday wishes in Hindi for WhatsApp.',
    h1: 'जन्मदिन की शुभकामनाएं',
    jsonLd: collectionJsonLd({ name: 'Birthday Wishes in Hindi', description: 'जन्मदिन की शुभकामनाएं हिंदी में', url: '/birthday-wishes' }),
  },
  '/anniversary-wishes': {
    title: 'Anniversary Wishes in Hindi | शादी की सालगिरह - DoAide Shayari',
    description: 'शादी की सालगिरह की शुभकामनाएं हिंदी में। Happy Anniversary wishes in Hindi.',
    h1: 'शादी की सालगिरह की शुभकामनाएं',
    jsonLd: collectionJsonLd({ name: 'Anniversary Wishes in Hindi', description: 'शादी की सालगिरह की शुभकामनाएं हिंदी में', url: '/anniversary-wishes' }),
  },
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
