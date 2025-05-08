export function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch (_) {
    return false
  }
}

export function isValidTel(string: string): boolean {
  const cleaned = string.trim();
  return /^tel:\+?[0-9]{7,15}$/.test(cleaned);
}

export function isValidSms(string: string): boolean {
  const cleaned = string.trim();
  return /^sms:\+?[0-9]{7,15}$/.test(cleaned);
}

export function isValidEmail(string: string): boolean {
  const cleaned = string.trim();
  return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
}

export function detectContentType(content: string): "url" | "email" | "sms" | "tel" | "text" {
  if (isValidUrl(content)) return "url"
  if (isValidEmail(content)) return "email"
  if (isValidSms(content)) return "sms"
  if (isValidTel(content)) return "tel"
  return "text"
}

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
