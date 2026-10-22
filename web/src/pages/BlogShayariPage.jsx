import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const SECTIONS = [
  {
    id: 'what-is-shayari',
    title: 'शायरी क्या है?',
    titleEn: 'What is Shayari?',
    content: `शायरी उर्दू और हिंदी काव्य की एक प्राचीन विधा है जो सदियों से भारतीय संस्कृति का अभिन्न अंग रही है। शायरी में दो पंक्तियों के शेर (couplet) होते हैं जो एक गहरी भावना या विचार व्यक्त करते हैं।

मिर्ज़ा ग़ालिब, मीर तक़ी मीर, अल्लामा इक़बाल, फ़ैज़ अहमद फ़ैज़ — ये कुछ ऐसे नाम हैं जिन्होंने शायरी को दुनिया भर में पहचान दिलाई। आज डिजिटल युग में शायरी WhatsApp, Instagram और Facebook पर सबसे ज़्यादा शेयर किया जाने वाला हिंदी कंटेंट है।`,
  },
  {
    id: 'types-of-shayari',
    title: 'शायरी के प्रकार',
    titleEn: 'Types of Shayari',
    content: `**लव शायरी (Love Shayari)** — प्यार, मोहब्बत और रोमांस की भावनाएं। सबसे लोकप्रिय श्रेणी जो Valentine's Day और शादी की सालगिरह पर ख़ासतौर पर ट्रेंड करती है।

**सैड शायरी (Sad Shayari)** — दर्द, जुदाई और तन्हाई के एहसास। हिंदी में "दर्द भरी शायरी" के नाम से जानी जाती है।

**दोस्ती शायरी (Friendship Shayari)** — यारी, दोस्ती और भाईचारे पर। Friendship Day पर सबसे ज़्यादा शेयर होती है।

**मोटिवेशनल शायरी (Motivational Shayari)** — हौसला, जोश और प्रेरणा देने वाली शायरी। Exam सीज़न और New Year पर trending।

**एटीट्यूड शायरी (Attitude Shayari)** — स्वाभिमान और आत्मविश्वास की शायरी। Instagram और WhatsApp status के लिए popular।

**फ़नी शायरी (Funny Shayari)** — हास्य और मज़ाक़ भरी शायरी जो हँसाए भी और सोचने पर मजबूर करे।`,
  },
  {
    id: 'festival-messages',
    title: 'त्योहारों पर शायरी और शुभकामनाएं',
    titleEn: 'Festival Shayari & Wishes',
    content: `भारत त्योहारों का देश है और हर त्योहार पर लोग अपनों को शुभकामनाएं भेजते हैं। DoAide Shayari पर आपको मिलेंगे:

🪔 **दिवाली** — दीपों का त्योहार, लक्ष्मी पूजा की शुभकामनाएं
🎨 **होली** — रंगों का त्योहार, होली की बधाई
🌙 **ईद** — ईद मुबारक के संदेश
🎄 **क्रिसमस** — Merry Christmas wishes हिंदी में
🧵 **रक्षाबंधन** — भाई-बहन का प्यार
🔱 **नवरात्रि** — माता की शक्ति की शुभकामनाएं
🎉 **नया साल** — Happy New Year messages

हर त्योहार के लिए ताज़ा शुभकामनाएं DoAide Shayari के festivals page पर मिलती हैं।`,
  },
  {
    id: 'whatsapp-sharing',
    title: 'WhatsApp पर शायरी कैसे शेयर करें',
    titleEn: 'How to Share Shayari on WhatsApp',
    content: `WhatsApp भारत का सबसे बड़ा messaging platform है और शायरी शेयर करने का सबसे आसान तरीक़ा। DoAide Shayari पर:

1. **अपनी पसंद की शायरी चुनें** — कैटेगरी ब्राउज़ करें या सर्च करें
2. **"WhatsApp" बटन दबाएं** — शायरी सीधे WhatsApp में खुलेगी
3. **Contact या Group चुनें** — भेजें!

या "कॉपी करें" बटन दबाकर शायरी कॉपी करें और WhatsApp Status में लगाएं।

**Pro Tip:** इमेज कार्ड बनाकर WhatsApp Status या Instagram Story में लगाएं — ज़्यादा लोग देखेंगे और interact करेंगे!`,
  },
  {
    id: 'quote-card-tips',
    title: 'शायरी इमेज कार्ड बनाने के टिप्स',
    titleEn: 'Tips for Creating Quote Cards',
    content: `Instagram और WhatsApp Status के लिए इमेज कार्ड सबसे effective format है:

✅ **छोटी शायरी चुनें** — 2-4 लाइन बेस्ट है, ज़्यादा लंबी शायरी छोटी दिखेगी
✅ **कॉन्ट्रास्ट रखें** — गहरा बैकग्राउंड + सफ़ेद टेक्स्ट सबसे readable
✅ **फ़ॉन्ट साइज़** — 40-52px Instagram के लिए perfect
✅ **1080×1080** — Instagram post और WhatsApp दोनों के लिए ideal size

DoAide Shayari का Quote Card Maker यह सब automatic करता है — बस शायरी लिखें, बैकग्राउंड चुनें और डाउनलोड करें!`,
  },
  {
    id: 'ai-generator',
    title: 'AI से शायरी कैसे बनाएं',
    titleEn: 'How AI Shayari Generator Works',
    content: `DoAide Shayari का AI Generator Google Gemini AI से powered है। यह आपके लिए personalized शायरी बनाता है:

1. कैटेगरी चुनें (शायरी, गुड मॉर्निंग, बर्थडे, त्योहार...)
2. उपश्रेणी चुनें (ऑप्शनल)
3. बताएं किसके लिए है (ऑप्शनल)
4. "शायरी बनाएं" दबाएं

AI कुछ सेकंड में एक unique शायरी बनाकर देगा — हिंदी (देवनागरी) और रोमन दोनों में। हर बार नई शायरी मिलेगी!

**Privacy:** कोई भी डेटा save नहीं होता, कोई login ज़रूरी नहीं।`,
  },
];

const FAQS = [
  ['शायरी और कविता में क्या अंतर है?', 'शायरी उर्दू काव्य परंपरा से आती है और आमतौर पर शेर (दो पंक्तियों) में लिखी जाती है। कविता हिंदी साहित्य की विधा है जो किसी भी format में हो सकती है। शायरी में ग़ज़ल, नज़्म, रुबाई जैसे forms होते हैं।'],
  ['क्या AI शायरी असली शायरी जितनी अच्छी होती है?', 'AI शायरी casual sharing के लिए बहुत अच्छी है — WhatsApp messages, birthday wishes के लिए perfect। लेकिन classic शायरों की गहराई और अनुभव AI में नहीं आता। DoAide Shayari पर दोनों मिलते हैं।'],
  ['शायरी को Instagram पर कैसे post करें?', 'सबसे अच्छा तरीक़ा है इमेज कार्ड बनाना। DoAide Shayari के Quote Card Maker से 1080×1080 PNG बनाएं और Instagram पर post करें। Text-only post Instagram पर कम reach मिलती है।'],
  ['Good Morning messages रोज़ कैसे मिलें?', 'DoAide Shayari हर रोज़ daily fresh content update करता है। बुकमार्क करें और रोज़ सुबह open करें — नए गुड मॉर्निंग मैसेज मिलेंगे!'],
  ['क्या DoAide Shayari free है?', 'हाँ, पूरी तरह free! कोई login ज़रूरी नहीं, कोई subscription नहीं। शायरी पढ़ें, कॉपी करें, WhatsApp पर शेयर करें — सब free!'],
  ['शायरी में "शेर" और "ग़ज़ल" क्या होते हैं?', 'शेर दो पंक्तियों का एक unit है — शायरी की सबसे छोटी इकाई। ग़ज़ल कई शेरों का collection है जो एक ही meter और rhyme scheme follow करती है। एक ग़ज़ल में कम से कम 5 शेर होते हैं।'],
];

export default function BlogShayariPage() {
  return (
    <>
      <SEOHead
        title="Hindi Shayari Guide 2026 | हिंदी शायरी गाइड — Types, Festivals, WhatsApp Tips - DoAide Shayari"
        description="हिंदी शायरी की पूरी गाइड 2026: शायरी के प्रकार, त्योहारों की शुभकामनाएं, WhatsApp tips, इमेज कार्ड, AI generator। Complete Hindi Shayari guide."
        url="/hindi-shayari-guide"
      />

      <section className="bg-gradient-to-br from-primary-700 via-primary-500 to-teal-400 text-white py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white">होम</Link>
            <span className="mx-2">›</span>
            <span>गाइड</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="font-hindi">हिंदी शायरी गाइड 2026</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-1">
            Complete Guide to Hindi Shayari — Types, Festivals, WhatsApp & Instagram Tips
          </p>
          <p className="text-sm opacity-70">अपडेटेड: अक्टूबर 2026</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <nav className="bg-[var(--da-surface)] rounded-xl p-4 mb-8 border border-[var(--da-border)]">
          <h2 className="text-sm font-semibold text-[var(--da-text)] mb-2">📋 विषय सूची | Contents</h2>
          <ol className="space-y-1 text-sm">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-primary-600 hover:underline">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="text-primary-600 hover:underline">{SECTIONS.length + 1}. अक्सर पूछे जाने वाले सवाल (FAQ)</a>
            </li>
          </ol>
        </nav>

        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--da-text)] mb-3 font-hindi">
              {s.title}{' '}
              <span className="text-[var(--da-text-secondary)] font-normal text-sm">| {s.titleEn}</span>
            </h2>
            <div className="prose prose-slate max-w-none text-[var(--da-text)] leading-relaxed font-hindi whitespace-pre-line">
              {s.content.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </section>
        ))}

        <section id="faq" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--da-text)] mb-4 font-hindi">
            अक्सर पूछे जाने वाले सवाल <span className="text-[var(--da-text-secondary)] font-normal text-sm">| FAQ</span>
          </h2>
          <div className="space-y-4">
            {FAQS.map(([q, a], i) => (
              <details key={i} className="bg-[var(--da-surface)] rounded-xl border border-[var(--da-border)] overflow-hidden">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-[var(--da-text)] hover:text-primary-600 transition-colors font-hindi">
                  {q}
                </summary>
                <p className="px-5 pb-4 text-[var(--da-text-secondary)] font-hindi leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-primary-500 to-teal-400 rounded-2xl p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2 font-hindi">शायरी पढ़ने का मन है?</h2>
          <p className="mb-4 opacity-90">हज़ारों शायरी, शुभकामनाएं और AI Generator — सब free!</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/hindi-shayari" className="px-6 py-3 bg-white text-primary-700 rounded-full font-semibold hover:bg-primary-50 transition-colors">
              शायरी पढ़ें
            </Link>
            <Link to="/generate" className="px-6 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors">
              ✨ AI Generator
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
