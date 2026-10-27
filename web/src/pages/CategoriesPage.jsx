import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { collectionPageJsonLd } from '../utils/seo';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCategories } from '../hooks/useContent';

const SECTIONS = [
  {
    title: '💖 शायरी',
    titleEn: 'Shayari',
    items: [
      { to: '/hindi-shayari', emoji: '📝', hi: 'हिंदी शायरी', en: 'Hindi Shayari' },
      { to: '/love-shayari', emoji: '💖', hi: 'लव शायरी', en: 'Love Shayari' },
      { to: '/sad-shayari', emoji: '😢', hi: 'सैड शायरी', en: 'Sad Shayari' },
      { to: '/friendship-shayari', emoji: '🤝', hi: 'दोस्ती शायरी', en: 'Friendship' },
      { to: '/motivational-shayari', emoji: '💪', hi: 'मोटिवेशनल', en: 'Motivational' },
      { to: '/category/shayari?subcategory=attitude', emoji: '😎', hi: 'एटीट्यूड', en: 'Attitude' },
      { to: '/category/shayari?subcategory=funny', emoji: '😄', hi: 'फ़नी', en: 'Funny' },
    ],
  },
  {
    title: '🌅 गुड मॉर्निंग / गुड नाइट',
    titleEn: 'Greetings',
    items: [
      { to: '/good-morning-images', emoji: '🌅', hi: 'गुड मॉर्निंग', en: 'Good Morning' },
      { to: '/good-night-images', emoji: '🌙', hi: 'गुड नाइट', en: 'Good Night' },
    ],
  },
  {
    title: '🎂 शुभकामनाएं',
    titleEn: 'Wishes',
    items: [
      { to: '/birthday-wishes', emoji: '🎂', hi: 'बर्थडे', en: 'Birthday' },
      { to: '/anniversary-wishes', emoji: '💑', hi: 'एनिवर्सरी', en: 'Anniversary' },
      { to: '/occasion-generator', emoji: '✍️', hi: 'मैसेज जनरेटर', en: 'Message Generator' },
    ],
  },
  {
    title: '🪔 त्योहार',
    titleEn: 'Festivals',
    items: [
      { to: '/festivals', emoji: '🪔', hi: 'सभी त्योहार', en: 'All Festivals' },
      { to: '/category/festival?subcategory=diwali', emoji: '🪔', hi: 'दिवाली', en: 'Diwali' },
      { to: '/category/festival?subcategory=holi', emoji: '🎨', hi: 'होली', en: 'Holi' },
      { to: '/category/festival?subcategory=eid', emoji: '🌙', hi: 'ईद', en: 'Eid' },
      { to: '/category/festival?subcategory=christmas', emoji: '🎄', hi: 'क्रिसमस', en: 'Christmas' },
      { to: '/category/festival?subcategory=raksha_bandhan', emoji: '🧵', hi: 'रक्षाबंधन', en: 'Raksha Bandhan' },
      { to: '/category/festival?subcategory=navratri', emoji: '🔱', hi: 'नवरात्रि', en: 'Navratri' },
      { to: '/category/festival?subcategory=new_year', emoji: '🎉', hi: 'नया साल', en: 'New Year' },
    ],
  },
  {
    title: '🛠️ टूल्स',
    titleEn: 'Tools',
    items: [
      { to: '/generate', emoji: '✨', hi: 'AI जनरेटर', en: 'AI Generator' },
      { to: '/quote-card', emoji: '🖼️', hi: 'इमेज कार्ड', en: 'Quote Card' },
    ],
  },
];

export default function CategoriesPage() {
  const { data: cats, isLoading } = useCategories();

  const countMap = {};
  if (cats) {
    for (const c of cats) {
      countMap[c.category] = c.count;
      if (c.subcategories) {
        for (const [sub, cnt] of Object.entries(c.subcategories)) {
          countMap[`${c.category}:${sub}`] = cnt;
        }
      }
    }
  }

  return (
    <>
      <SEOHead
        title="सभी कैटेगरी | All Categories - DoAide Shayari"
        description="शायरी, गुड मॉर्निंग, गुड नाइट, बर्थडे, एनिवर्सरी, त्योहार — सभी कैटेगरी एक जगह। Browse all Hindi Shayari categories."
        url="/categories"
        jsonLd={collectionPageJsonLd({ name: 'All Categories - DoAide Shayari', description: 'शायरी, शुभकामनाएं, त्योहार, बर्थडे विशेज — सभी कैटेगरी एक जगह', url: '/categories' })}
      />

      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-teal-400 text-white py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="font-hindi">📚 सभी कैटेगरी</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90">Browse All Categories</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
        {isLoading && <LoadingSpinner />}
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-hindi text-xl font-bold text-[var(--da-text)] mb-4">
              {section.title}{' '}
              <span className="text-[var(--da-text-secondary)] font-normal text-sm">| {section.titleEn}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 bg-[var(--da-bg)] rounded-xl p-4 border border-[var(--da-border)] hover:border-primary-300 hover:shadow-md transition-all group"
                >
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <div className="min-w-0">
                    <span className="font-hindi font-semibold text-sm text-[var(--da-text)] block group-hover:text-primary-600 transition-colors">
                      {item.hi}
                    </span>
                    <span className="text-xs text-[var(--da-text-secondary)]">{item.en}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
