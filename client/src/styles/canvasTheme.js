export const canvasTheme = {
  background: 'linear-gradient(135deg, #060816 0%, #0f172a 45%, #111827 100%)',
  surface: 'rgba(15, 23, 42, 0.78)',
  surfaceStrong: 'rgba(30, 41, 59, 0.92)',
  surfaceSoft: 'rgba(17, 24, 39, 0.72)',
  border: 'rgba(148, 163, 184, 0.24)',
  borderAccent: 'rgba(129, 140, 248, 0.38)',
  shadow: '0 24px 70px rgba(2, 6, 23, 0.42)',
  accent: '#8b5cf6',
  accentSecondary: '#38bdf8',
  accentSuccess: '#34d399',
  accentDanger: '#2d2e63',
  textPrimary: '#182d42',
  textSecondary: '#203654',
  textMuted: '#283d5c',
  radius: '22px',
};

function normalizeColor(value) {
  if (!value || typeof value !== 'string') return null;

  const trimmed = value.trim();
  const hexMatch = trimmed.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const fullHex = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex;
    const bigint = parseInt(fullHex.slice(0, 6), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  return null;
}

export function getReadableTextColor(background) {
  const color = normalizeColor(background);
  if (!color) {
    return canvasTheme.textPrimary;
  }

  const luminance = (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
  return luminance > 0.62 ? '#0f172a' : canvasTheme.textPrimary;
}
