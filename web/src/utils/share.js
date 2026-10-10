export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
}

export function shareOnWhatsApp(text) {
  const message = text + '\n\n— DoAide Shayari (shayari.doaide.com)';
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}
