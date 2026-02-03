export function getLogoUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}`;
}
