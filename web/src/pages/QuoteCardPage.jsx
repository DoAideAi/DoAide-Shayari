import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const GRADIENTS = [
  { name: 'Sunset', colors: ['#ff6b35', '#f7c59f'] },
  { name: 'Ocean', colors: ['#1a535c', '#4ecdc4'] },
  { name: 'Rose', colors: ['#e63946', '#f1a7b5'] },
  { name: 'Night', colors: ['#1b1b2f', '#6c63ff'] },
  { name: 'Forest', colors: ['#2d6a4f', '#95d5b2'] },
  { name: 'Royal', colors: ['#5f0a87', '#a4508b'] },
  { name: 'Gold', colors: ['#bc6c25', '#fefae0'] },
  { name: 'Sky', colors: ['#023e8a', '#90e0ef'] },
];

const FONTS = [
  { name: 'Noto Sans Devanagari', label: 'नोटो सैंस' },
  { name: 'serif', label: 'सेरिफ़' },
  { name: 'sans-serif', label: 'सैंस' },
];

function drawCard(canvas, { text, gradient, font, fontSize }) {
  const W = 1080;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, gradient.colors[0]);
  grad.addColorStop(1, gradient.colors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, W, H);

  const pad = 80;
  const maxW = W - pad * 2;
  ctx.font = `bold ${fontSize}px "${font}", "Noto Sans Devanagari", sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 10;

  const lines = [];
  const paragraphs = text.split('\n');
  for (const para of paragraphs) {
    const words = para.split(/\s+/);
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    else lines.push('');
  }

  const lineH = fontSize * 1.5;
  const totalH = lines.length * lineH;
  let y = (H - totalH) / 2 + lineH / 2;
  for (const l of lines) {
    ctx.fillText(l, W / 2, y, maxW);
    y += lineH;
  }

  ctx.shadowBlur = 0;
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('shayari.doaide.com', W / 2, H - 40);
}

export default function QuoteCardPage() {
  const [text, setText] = useState('दिल की बात\nशब्दों में कह दो,\nख़ामोशी को\nज़ुबान दे दो।');
  const [gradIdx, setGradIdx] = useState(0);
  const [fontIdx, setFontIdx] = useState(0);
  const [fontSize, setFontSize] = useState(48);
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCard(canvas, {
      text,
      gradient: GRADIENTS[gradIdx],
      font: FONTS[fontIdx].name,
      fontSize,
    });
    setPreview(canvas.toDataURL('image/png'));
  }, [text, gradIdx, fontIdx, fontSize]);

  const download = () => {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.download = 'shayari-card.png';
    a.click();
  };

  return (
    <>
      <SEOHead
        title="Shayari Image Card Maker | शायरी इमेज कार्ड बनाएं - DoAide Shayari"
        description="अपनी शायरी को ख़ूबसूरत इमेज कार्ड में बदलें। ग्रेडिएंट बैकग्राउंड, हिंदी फ़ॉन्ट। डाउनलोड करें और WhatsApp/Instagram पर शेयर करें।"
        url="/quote-card"
      />

      <section className="bg-gradient-to-br from-purple-600 to-pink-500 text-white py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white">होम</Link>
            <span className="mx-2">›</span>
            <span>इमेज कार्ड</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="font-hindi">🖼️ शायरी इमेज कार्ड बनाएं</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90">Create Beautiful Quote Cards</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-[var(--da-bg)] rounded-2xl shadow-lg p-6 space-y-5 border border-[var(--da-border)]">
          <div>
            <label className="block text-sm font-medium text-[var(--da-text)] mb-1 font-hindi">शायरी / टेक्स्ट लिखें</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-[var(--da-border)] bg-[var(--da-surface)] text-[var(--da-text)] font-hindi text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="यहाँ शायरी लिखें..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--da-text)] mb-2 font-hindi">बैकग्राउंड चुनें</label>
            <div className="flex flex-wrap gap-2">
              {GRADIENTS.map((g, i) => (
                <button
                  key={g.name}
                  onClick={() => setGradIdx(i)}
                  className={`w-12 h-12 rounded-xl transition-all ${
                    gradIdx === i ? 'ring-2 ring-primary-500 ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})` }}
                  aria-label={g.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--da-text)] mb-1 font-hindi">फ़ॉन्ट</label>
              <select
                value={fontIdx}
                onChange={(e) => setFontIdx(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--da-border)] bg-[var(--da-surface)] text-[var(--da-text)] focus:ring-2 focus:ring-primary-500"
              >
                {FONTS.map((f, i) => (
                  <option key={f.name} value={i}>{f.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--da-text)] mb-1 font-hindi">साइज़: {fontSize}px</label>
              <input
                type="range"
                min={28}
                max={72}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mt-2 accent-primary-500"
              />
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all shadow-md font-hindi"
          >
            🖼️ कार्ड बनाएं
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {preview && (
          <div className="mt-6 text-center">
            <img
              src={preview}
              alt="शायरी कार्ड"
              className="rounded-2xl shadow-xl mx-auto max-w-full"
              style={{ maxHeight: '500px' }}
            />
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={download}
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-full text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-md"
              >
                ⬇️ डाउनलोड करें
              </button>
            </div>
            <p className="text-xs text-[var(--da-text-secondary)] mt-3">
              1080×1080 PNG — Instagram, WhatsApp Status, Facebook पर शेयर करें
            </p>
          </div>
        )}
      </section>
    </>
  );
}
