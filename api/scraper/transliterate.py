"""Lightweight Devanagari -> Hinglish (Roman) transliteration.

Produces casual, readable Hinglish ("Teri yaad mein") rather than strict ISO-15919,
with a simple schwa-deletion heuristic so words don't end in a spurious "a".
"""
import re
import unicodedata

CONSONANTS = {
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "n",
    "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "n",
    "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v", "श": "sh",
    "ष": "sh", "स": "s", "ह": "h", "ळ": "l",
    "क़": "q", "ख़": "kh", "ग़": "g", "ज़": "z", "ड़": "d", "ढ़": "rh", "फ़": "f", "य़": "y",
}
NUKTA_BASE = {"क": "q", "ख": "kh", "ग": "g", "ज": "z", "ड": "d", "ढ": "rh", "फ": "f"}
VOWELS = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo", "ऋ": "ri",
    "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au", "ऑ": "o", "ऍ": "e",
}
MATRAS = {
    "ा": "a", "ि": "i", "ी": "i", "ु": "u", "ू": "u", "ृ": "ri",
    "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ॉ": "o", "ॅ": "e",
}
VIRAMA = "्"
NUKTA = "़"
ANUSVARA = {"ं": "n", "ँ": "n"}
VISARGA = "ः"
DIGITS = {chr(0x0966 + i): str(i) for i in range(10)}
PUNCT = {"।": ".", "॥": ".", "ऽ": "", "ॐ": "Om"}


def _tokens(word):
    """Split a Devanagari word into (kind, roman) units."""
    out = []
    i = 0
    n = len(word)
    while i < n:
        ch = word[i]
        nxt = word[i + 1] if i + 1 < n else ""
        if ch in CONSONANTS or (ch in NUKTA_BASE and nxt == NUKTA):
            if nxt == NUKTA and ch in NUKTA_BASE:
                roman = NUKTA_BASE[ch]
                i += 1
            else:
                roman = CONSONANTS[ch]
            i += 1
            # what follows the consonant?
            follow = word[i] if i < n else ""
            if follow == VIRAMA:
                out.append(("C", roman, ""))
                i += 1
            elif follow in MATRAS:
                out.append(("C", roman, MATRAS[follow]))
                i += 1
            else:
                out.append(("C", roman, "a*"))  # inherent schwa, may be deleted
        elif ch in VOWELS:
            out.append(("V", VOWELS[ch], ""))
            i += 1
        elif ch in ANUSVARA:
            out.append(("N", "n", ""))
            i += 1
        elif ch == VISARGA:
            out.append(("N", "h", ""))
            i += 1
        elif ch in DIGITS:
            out.append(("X", DIGITS[ch], ""))
            i += 1
        elif ch in PUNCT:
            out.append(("X", PUNCT[ch], ""))
            i += 1
        elif ch == NUKTA or ch == VIRAMA:
            i += 1
        elif ch in MATRAS:  # stray vowel sign (e.g. after a space or emoji)
            out.append(("X", MATRAS[ch], ""))
            i += 1
        else:
            out.append(("X", ch, ""))
            i += 1
    return out


# Common words where the rules give an unnatural spelling.
OVERRIDES = {"में": "mein", "मैं": "main", "हूँ": "hoon", "हूं": "hoon", "यूँ": "yun", "क्यों": "kyon", "क्यूँ": "kyun"}


def _word(word):
    if word in OVERRIDES:
        return OVERRIDES[word]
    toks = _tokens(word)
    if not toks:
        return word
    # Schwa deletion: drop the final inherent "a" (unless the word is a single
    # consonant) and a medial one when it sits between a vowel-bearing syllable
    # and a consonant carrying a full vowel sign: "karata" -> "karta".
    letter_count = sum(1 for t in toks if t[0] in "CV")
    last_letter = max((k for k, t in enumerate(toks) if t[0] in "CV"), default=-1)
    result = []
    for k, (kind, roman, vowel) in enumerate(toks):
        if kind != "C":
            result.append(roman)
            continue
        if vowel == "a*":
            prev_has_vowel = k > 0 and (toks[k - 1][0] == "V" or toks[k - 1][2] != "")
            nxt = toks[k + 1] if k + 1 < len(toks) else None
            next_full = nxt is not None and nxt[0] == "C" and nxt[2] not in ("", "a*")
            if k == last_letter and letter_count > 1:
                vowel = ""
            elif prev_has_vowel and next_full and k != last_letter:
                vowel = ""
            else:
                vowel = "a"
        result.append(roman + vowel)
    return "".join(result)


_DEVA = re.compile(r"[ऀ-ॿ]+")


def transliterate(text):
    def repl(m):
        return _word(m.group(0))

    # NFD splits precomposed nukta letters (U+0958..U+095F) into base + nukta.
    text = unicodedata.normalize("NFD", text)
    lines = []
    for line in text.split("\n"):
        out = _DEVA.sub(repl, line)
        out = re.sub(r"\s+", " ", out).strip()
        if out:
            out = out[0].upper() + out[1:]
        lines.append(out)
    return "\n".join(lines)


if __name__ == "__main__":
    for s in [
        "तेरी आँखों में खो जाने का मन करता है,\nतेरे साथ हर पल बिताने का मन करता है।",
        "मोहब्बत का इज़हार ज़रूरी नहीं, कभी आँखें भी बहुत कुछ कह जाती हैं।",
        "दोस्ती ज़िंदगी की सबसे खूबसूरत धड़कन है",
        "समझना सुप्रभात जन्मदिन मुबारक दिल",
    ]:
        print(transliterate(s))
