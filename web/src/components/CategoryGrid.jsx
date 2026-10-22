import { Link } from 'react-router-dom';

const CATEGORIES = [
  { to: '/love-shayari', emoji: '💖', label: 'लव शायरी', labelEn: 'Love Shayari', gradient: 'from-pink-500 to-rose-500' },
  { to: '/sad-shayari', emoji: '😢', label: 'सैड शायरी', labelEn: 'Sad Shayari', gradient: 'from-blue-500 to-indigo-500' },
  { to: '/friendship-shayari', emoji: '🤝', label: 'दोस्ती शायरी', labelEn: 'Friendship', gradient: 'from-teal-500 to-cyan-500' },
  { to: '/motivational-shayari', emoji: '💪', label: 'मोटिवेशनल', labelEn: 'Motivational', gradient: 'from-emerald-500 to-teal-500' },
  { to: '/category/shayari?subcategory=attitude', emoji: '😎', label: 'एटीट्यूड', labelEn: 'Attitude', gradient: 'from-purple-500 to-violet-500' },
  { to: '/category/shayari?subcategory=funny', emoji: '😄', label: 'फ़नी शायरी', labelEn: 'Funny', gradient: 'from-teal-400 to-emerald-500' },
  { to: '/good-morning-images', emoji: '🌅', label: 'गुड मॉर्निंग', labelEn: 'Good Morning', gradient: 'from-primary-500 to-primary-600' },
  { to: '/good-night-images', emoji: '🌙', label: 'गुड नाइट', labelEn: 'Good Night', gradient: 'from-slate-600 to-slate-800' },
  { to: '/birthday-wishes', emoji: '🎂', label: 'बर्थडे विशेज', labelEn: 'Birthday', gradient: 'from-pink-500 to-purple-500' },
  { to: '/anniversary-wishes', emoji: '💑', label: 'एनिवर्सरी', labelEn: 'Anniversary', gradient: 'from-rose-500 to-pink-500' },
  { to: '/category/festival', emoji: '🪔', label: 'त्योहार', labelEn: 'Festivals', gradient: 'from-primary-500 to-emerald-500' },
  { to: '/generate', emoji: '✨', label: 'AI जनरेटर', labelEn: 'AI Generator', gradient: 'from-primary-600 to-teal-400' },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {CATEGORIES.map(({ to, emoji, label, labelEn, gradient }) => (
        <Link
          key={to}
          to={to}
          className={`bg-gradient-to-br ${gradient} rounded-2xl p-4 sm:p-5 text-white text-center hover:scale-105 transition-transform shadow-md`}
        >
          <span className="text-3xl sm:text-4xl block mb-2">{emoji}</span>
          <span className="font-hindi font-semibold text-sm sm:text-base block">{label}</span>
          <span className="text-xs opacity-80 block">{labelEn}</span>
        </Link>
      ))}
    </div>
  );
}
