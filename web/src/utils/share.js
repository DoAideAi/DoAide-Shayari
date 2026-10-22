const SIGNATURE = '\n\n— DoAide Shayari (shayari.doaide.com)';

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
}

export function shareOnWhatsApp(text) {
  const encoded = encodeURIComponent(text + SIGNATURE);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

export function shareOnTwitter(text) {
  // X caps posts at 280 chars; trim long shayari so the link survives.
  const short = text.length > 220 ? `${text.slice(0, 217)}…` : text;
  const encoded = encodeURIComponent(`${short}\n\nshayari.doaide.com`);
  window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
}

// Instagram has no web share intent: use the native share sheet when the
// device has one (it lists Instagram), otherwise copy so it can be pasted.
export async function shareForInstagram(text) {
  const full = text + SIGNATURE;
  if (navigator.share) {
    try {
      await navigator.share({ text: full });
      return 'shared';
    } catch (e) {
      if (e?.name === 'AbortError') return 'cancelled';
    }
  }
  return (await copyToClipboard(full)) ? 'copied' : 'failed';
}
