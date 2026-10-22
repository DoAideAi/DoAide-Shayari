import { useState, useMemo } from 'react';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { copyToClipboard, shareOnWhatsApp } from '../utils/share';

const OCCASIONS = [
  { key: 'birthday', hi: 'जन्मदिन', en: 'Birthday', emoji: '🎂' },
  { key: 'anniversary', hi: 'सालगिरह', en: 'Anniversary', emoji: '💑' },
];

const RELATIONS = {
  birthday: [
    { key: 'friend', hi: 'दोस्त', en: 'Friend' },
    { key: 'wife', hi: 'पत्नी', en: 'Wife' },
    { key: 'husband', hi: 'पति', en: 'Husband' },
    { key: 'mother', hi: 'माँ', en: 'Mother' },
    { key: 'father', hi: 'पापा', en: 'Father' },
    { key: 'sister', hi: 'बहन', en: 'Sister' },
    { key: 'brother', hi: 'भाई', en: 'Brother' },
    { key: 'boss', hi: 'बॉस', en: 'Boss' },
  ],
  anniversary: [
    { key: 'couple', hi: 'कपल', en: 'Couple' },
    { key: 'parents', hi: 'माता-पिता', en: 'Parents' },
    { key: 'friend', hi: 'दोस्त', en: 'Friend' },
    { key: 'self', hi: 'खुद के लिए', en: 'Self' },
  ],
};

const TEMPLATES = {
  birthday: {
    friend: [
      { hi: 'जन्मदिन मुबारक हो दोस्त! 🎉\nतेरी ज़िन्दगी में खुशियाँ ही खुशियाँ हों,\nहर ख़्वाब पूरा हो, हर दिन नया हो।\nHappy Birthday Yaar! 🎂', translit: 'Janamdin mubarak ho dost!\nTeri zindagi mein khushiyan hi khushiyan hon,\nHar khwaab poora ho, har din naya ho.\nHappy Birthday Yaar!' },
      { hi: 'बर्थडे बॉय/गर्ल! 🎈\nतू हमेशा ऐसे ही हँसता/हँसती रहे,\nज़िन्दगी में वो सब मिले जो तू चाहे।\nHappiest Birthday! 🥳', translit: 'Birthday Boy/Girl!\nTu hamesha aise hi hansta/hansti rahe,\nZindagi mein wo sab mile jo tu chahe.\nHappiest Birthday!' },
      { hi: 'पागल! आज तेरा दिन है! 🎊\nकेक काट, मज़े कर, दुनिया भूल जा।\nतेरी उम्र लंबी हो और दोस्ती हमारी और भी!\nHappy Birthday Dost! 🎂🎉', translit: 'Pagal! Aaj tera din hai!\nCake kaat, maze kar, duniya bhool ja.\nTeri umr lambi ho aur dosti hamari aur bhi!\nHappy Birthday Dost!' },
    ],
    wife: [
      { hi: 'जन्मदिन मुबारक मेरी जान! ❤️\nतू मेरी ज़िन्दगी की सबसे ख़ूबसूरत तोहफ़ा है।\nहर साल तेरे साथ और ख़ास हो जाता है।\nHappy Birthday Wifey! 🎂💝', translit: 'Janamdin mubarak meri jaan!\nTu meri zindagi ki sabse khoobsurat tohfa hai.\nHar saal tere saath aur khaas ho jaata hai.\nHappy Birthday Wifey!' },
      { hi: 'मेरी प्यारी बीवी को जन्मदिन की ढेर सारी बधाई! 🌹\nतेरी हँसी मेरी दुनिया रोशन करती है।\nइस ख़ास दिन पर तुझे ढेर सारा प्यार! 💕', translit: 'Meri pyaari biwi ko janamdin ki dher saari badhai!\nTeri hansi meri duniya roshan karti hai.\nIs khaas din par tujhe dher saara pyaar!' },
    ],
    husband: [
      { hi: 'जन्मदिन मुबारक मेरे शौहर! 🎂\nतुम सबसे अच्छे पति हो, सबसे अच्छे दोस्त हो।\nभगवान तुम्हें लंबी उम्र और ख़ुशी दे। ❤️', translit: 'Janamdin mubarak mere shauhar!\nTum sabse acche pati ho, sabse acche dost ho.\nBhagwan tumhe lambi umr aur khushi de.' },
    ],
    mother: [
      { hi: 'जन्मदिन मुबारक माँ! 🌸\nतुम्हारा प्यार दुनिया की सबसे कीमती चीज़ है।\nभगवान तुम्हें हमेशा ख़ुश और सेहतमंद रखे। 🙏\nHappy Birthday Maa! ❤️', translit: 'Janamdin mubarak Maa!\nTumhara pyaar duniya ki sabse keemti cheez hai.\nBhagwan tumhe hamesha khush aur sehatmand rakhe.\nHappy Birthday Maa!' },
    ],
    father: [
      { hi: 'जन्मदिन मुबारक पापा! 🎂\nआप मेरे हीरो हैं, मेरी ताक़त हैं।\nभगवान आपको सेहत और ख़ुशी दे।\nHappy Birthday Papa! 🙏❤️', translit: 'Janamdin mubarak Papa!\nAap mere hero hain, meri taaqat hain.\nBhagwan aapko sehat aur khushi de.\nHappy Birthday Papa!' },
    ],
    sister: [
      { hi: 'Happy Birthday मेरी प्यारी बहन! 🎀\nतू सबसे बेस्ट है, सबसे ख़ास है।\nतेरी ज़िन्दगी में हमेशा खुशियाँ बनी रहें! 🌸💕', translit: 'Happy Birthday meri pyaari behen!\nTu sabse best hai, sabse khaas hai.\nTeri zindagi mein hamesha khushiyan bani rahen!' },
    ],
    brother: [
      { hi: 'जन्मदिन मुबारक भाई! 🎉\nतू हमेशा कामयाब हो, ख़ुश रहे।\nतेरे सपने सब पूरे हों! 💪\nHappy Birthday Bro! 🎂', translit: 'Janamdin mubarak bhai!\nTu hamesha kaamyaab ho, khush rahe.\nTere sapne sab poore hon!\nHappy Birthday Bro!' },
    ],
    boss: [
      { hi: 'जन्मदिन की हार्दिक शुभकामनाएं सर/मैम! 🎂\nआपका मार्गदर्शन हमेशा प्रेरणादायक है।\nभगवान आपको सफलता और ख़ुशी दे। 🙏', translit: 'Janamdin ki hardik shubhkaamnayein Sir/Ma\'am!\nAapka margdarshan hamesha prernadayak hai.\nBhagwan aapko safalta aur khushi de.' },
    ],
  },
  anniversary: {
    couple: [
      { hi: 'शादी की सालगिरह मुबारक! 💍\nआप दोनों का प्यार हमेशा ऐसे ही बना रहे।\nभगवान आपकी जोड़ी को सदा सलामत रखे। ❤️', translit: 'Shaadi ki saalgirah mubarak!\nAap dono ka pyaar hamesha aise hi bana rahe.\nBhagwan aapki jodi ko sada salamat rakhe.' },
      { hi: 'Happy Anniversary! 🥂\nआपकी जोड़ी देखकर लगता है\nकि सच्चा प्यार अभी भी ज़िन्दा है। 💕\nHappy Anniversary! 🎉', translit: 'Happy Anniversary!\nAapki jodi dekhkar lagta hai\nKi sachcha pyaar abhi bhi zinda hai.\nHappy Anniversary!' },
    ],
    parents: [
      { hi: 'शादी की सालगिरह मुबारक माँ-पापा! ❤️\nआप दोनों ने हमें प्यार का असली मतलब सिखाया।\nभगवान आपको और कई साल साथ रखे। 🙏', translit: 'Shaadi ki saalgirah mubarak Maa-Papa!\nAap dono ne hame pyaar ka asli matlab sikhaya.\nBhagwan aapko aur kai saal saath rakhe.' },
    ],
    friend: [
      { hi: 'Happy Anniversary दोस्त! 🎉\nतुम दोनों की जोड़ी सबसे बेस्ट है!\nHappy married life हमेशा! 💕🥂', translit: 'Happy Anniversary dost!\nTum dono ki jodi sabse best hai!\nHappy married life hamesha!' },
    ],
    self: [
      { hi: 'Happy Anniversary जानू! ❤️\nतेरे साथ का हर लम्हा यादगार है।\nऔर कई साल साथ बिताने हैं हमें! 💑🎉', translit: 'Happy Anniversary jaanu!\nTere saath ka har lamha yaadgaar hai.\nAur kai saal saath bitane hain hame!' },
    ],
  },
};

export default function OccasionGeneratorPage() {
  const [occasion, setOccasion] = useState('birthday');
  const [relation, setRelation] = useState('friend');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(null);

  const relations = RELATIONS[occasion] || [];
  const templates = useMemo(
    () => TEMPLATES[occasion]?.[relation] || [],
    [occasion, relation],
  );

  const messages = useMemo(() => {
    if (!name.trim()) return templates;
    return templates.map((t) => ({
      hi: t.hi.replace(/दोस्त|यार/g, name.trim()),
      translit: t.translit.replace(/dost|yaar/gi, name.trim()),
    }));
  }, [templates, name]);

  const handleCopy = async (text, idx) => {
    const ok = await copyToClipboard(text);
    if (ok) { setCopied(idx); setTimeout(() => setCopied(null), 2000); }
  };

  return (
    <>
      <SEOHead
        title="Birthday & Anniversary Message Generator in Hindi | DoAide Shayari"
        description="जन्मदिन और सालगिरह के लिए हिंदी में ख़ास संदेश बनाएं — दोस्त, पत्नी, पति, माँ, पापा के लिए। कॉपी करें और WhatsApp पर शेयर करें।"
        url="/occasion-generator"
      />

      <section className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-white py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white">होम</Link>
            <span className="mx-2">›</span>
            <span>मैसेज जनरेटर</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="font-hindi">🎂 बर्थडे और एनिवर्सरी मैसेज</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90">Personalized Birthday & Anniversary Messages</p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-[var(--da-bg)] rounded-2xl shadow-lg p-6 space-y-4 border border-[var(--da-border)]">
          <div>
            <label className="block text-sm font-medium text-[var(--da-text)] mb-2 font-hindi">अवसर चुनें</label>
            <div className="flex gap-3">
              {OCCASIONS.map((o) => (
                <button
                  key={o.key}
                  onClick={() => { setOccasion(o.key); setRelation(RELATIONS[o.key][0].key); }}
                  className={`flex-1 py-3 rounded-xl text-center transition-all font-medium ${
                    occasion === o.key
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-[var(--da-surface)] text-[var(--da-text)] border border-[var(--da-border)] hover:border-primary-300'
                  }`}
                >
                  <span className="text-xl block">{o.emoji}</span>
                  <span className="text-sm font-hindi">{o.hi}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--da-text)] mb-2 font-hindi">किसके लिए?</label>
            <div className="flex flex-wrap gap-2">
              {relations.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRelation(r.key)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    relation === r.key
                      ? 'bg-primary-500 text-white'
                      : 'bg-[var(--da-surface)] text-[var(--da-text-secondary)] border border-[var(--da-border)] hover:border-primary-300'
                  }`}
                >
                  {r.hi}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--da-text)] mb-1 font-hindi">नाम (ऑप्शनल)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="जैसे: राहुल, प्रिया..."
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--da-border)] bg-[var(--da-surface)] text-[var(--da-text)] placeholder-[var(--da-text-secondary)] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="bg-[var(--da-bg)] rounded-2xl shadow-lg border border-[var(--da-border)] overflow-hidden">
              <div className="p-5">
                <p className="font-hindi text-lg text-[var(--da-text)] leading-relaxed whitespace-pre-line mb-2">
                  {msg.hi}
                </p>
                <p className="text-sm text-[var(--da-text-secondary)] italic whitespace-pre-line mb-4">
                  {msg.translit}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(msg.hi + '\n\n' + msg.translit, i)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[48px] rounded-full text-sm font-medium bg-[var(--da-surface)] text-[var(--da-text)] hover:bg-primary-50 hover:text-primary-700 transition-colors border border-[var(--da-border)]"
                  >
                    {copied === i ? '✓ कॉपी हो गया!' : '📋 कॉपी करें'}
                  </button>
                  <button
                    onClick={() => shareOnWhatsApp(msg.hi + '\n\n' + msg.translit)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[48px] rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center text-[var(--da-text-secondary)] py-8 font-hindi">
              इस विकल्प के लिए संदेश जल्द आ रहे हैं।
            </p>
          )}
        </div>
      </section>
    </>
  );
}
