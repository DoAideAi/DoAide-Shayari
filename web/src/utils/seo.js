export function collectionPageJsonLd({ name, description, url, items = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `https://shayari.doaide.com${url}`,
    inLanguage: ['hi', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'DoAide | Shayari',
      url: 'https://shayari.doaide.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.slice(0, 10).map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          text: item.text_hindi,
          inLanguage: 'hi',
        },
      })),
    },
  };
}

export const SEO_DATA = {
  'good-morning-images': {
    title: 'Good Morning Images & Wishes in Hindi | गुड मॉर्निंग शुभकामनाएं - DoAide Shayari',
    description: 'गुड मॉर्निंग इमेज, सुप्रभात संदेश और शुभकामनाएं हिंदी में। WhatsApp पर शेयर करें। Good Morning images, wishes and messages in Hindi.',
    h1: 'गुड मॉर्निंग इमेज और शुभकामनाएं',
    h1En: 'Good Morning Images & Wishes in Hindi',
    category: 'good_morning',
  },
  'good-night-images': {
    title: 'Good Night Images & Wishes in Hindi | शुभ रात्रि संदेश - DoAide Shayari',
    description: 'गुड नाइट इमेज, शुभ रात्रि संदेश और शुभकामनाएं हिंदी में। Good Night images and wishes in Hindi for WhatsApp.',
    h1: 'गुड नाइट इमेज और शुभ रात्रि संदेश',
    h1En: 'Good Night Images & Wishes in Hindi',
    category: 'good_night',
  },
  'hindi-shayari': {
    title: 'Hindi Shayari | हिंदी शायरी संग्रह - प्यार, दर्द, दोस्ती - DoAide Shayari',
    description: 'बेहतरीन हिंदी शायरी - प्यार, दर्द, दोस्ती, एटीट्यूड शायरी। Hindi Shayari collection - Love, Sad, Friendship.',
    h1: 'हिंदी शायरी संग्रह',
    h1En: 'Hindi Shayari Collection',
    category: 'shayari',
  },
  'love-shayari': {
    title: 'Love Shayari in Hindi | लव शायरी - रोमांटिक शायरी - DoAide Shayari',
    description: 'बेहतरीन लव शायरी हिंदी में। रोमांटिक शायरी, मोहब्बत शायरी। Love Shayari, Romantic Shayari in Hindi.',
    h1: 'लव शायरी - रोमांटिक शायरी',
    h1En: 'Love Shayari in Hindi',
    category: 'shayari',
    subcategory: 'love',
  },
  'sad-shayari': {
    title: 'Sad Shayari in Hindi | दर्द भरी शायरी - DoAide Shayari',
    description: 'दर्द भरी शायरी, सैड शायरी हिंदी में। Sad Shayari, Dard Bhari Shayari in Hindi.',
    h1: 'दर्द भरी शायरी',
    h1En: 'Sad Shayari in Hindi',
    category: 'shayari',
    subcategory: 'sad',
  },
  'motivational-shayari': {
    title: 'Motivational Shayari in Hindi | मोटिवेशनल शायरी - जोश भरी शायरी - DoAide Shayari',
    description: 'मोटिवेशनल शायरी, जोश और हौसला बढ़ाने वाली शायरी हिंदी में। Motivational Shayari, Inspirational Shayari in Hindi.',
    h1: 'मोटिवेशनल शायरी - हौसला बढ़ाने वाली शायरी',
    h1En: 'Motivational Shayari in Hindi',
    category: 'shayari',
    subcategory: 'motivational',
  },
  'friendship-shayari': {
    title: 'Friendship Shayari in Hindi | दोस्ती शायरी - DoAide Shayari',
    description: 'दोस्ती शायरी, यारी शायरी हिंदी में। Friendship Shayari, Dosti Shayari in Hindi.',
    h1: 'दोस्ती शायरी - यारी शायरी',
    h1En: 'Friendship Shayari in Hindi',
    category: 'shayari',
    subcategory: 'friendship',
  },
  'birthday-wishes': {
    title: 'Birthday Wishes in Hindi | जन्मदिन की शुभकामनाएं - DoAide Shayari',
    description: 'जन्मदिन की शुभकामनाएं हिंदी में। Happy Birthday wishes in Hindi for WhatsApp.',
    h1: 'जन्मदिन की शुभकामनाएं',
    h1En: 'Birthday Wishes in Hindi',
    category: 'birthday',
  },
  'anniversary-wishes': {
    title: 'Anniversary Wishes in Hindi | शादी की सालगिरह - DoAide Shayari',
    description: 'शादी की सालगिरह की शुभकामनाएं हिंदी में। Happy Anniversary wishes in Hindi.',
    h1: 'शादी की सालगिरह की शुभकामनाएं',
    h1En: 'Anniversary Wishes in Hindi',
    category: 'anniversary',
  },
};
