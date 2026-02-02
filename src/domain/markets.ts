/**
 * Available markets with locale for price formatting (BCP 47: language-country).
 * Country code ≠ language code (e.g. AT → de-AT, CH → de-CH, BE → nl-BE).
 */
export const AVAILABLE_MARKETS = {
  DE: { code: 'DE', label: 'Germany', currency: 'EUR', vatCountryCode: 'DE', flag: '🇩🇪', locale: 'de-DE' },
  AT: { code: 'AT', label: 'Austria', currency: 'EUR', vatCountryCode: 'AT', flag: '🇦🇹', locale: 'de-AT' },
  BE: { code: 'BE', label: 'Belgium', currency: 'EUR', vatCountryCode: 'BE', flag: '🇧🇪', locale: 'nl-BE' },
  IT: { code: 'IT', label: 'Italy', currency: 'EUR', vatCountryCode: 'IT', flag: '🇮🇹', locale: 'it-IT' },
  CZ: { code: 'CZ', label: 'Czech Republic', currency: 'CZK', vatCountryCode: 'CZ', flag: '🇨🇿', locale: 'cs-CZ' },
  DK: { code: 'DK', label: 'Denmark', currency: 'DKK', vatCountryCode: 'DK', flag: '🇩🇰', locale: 'da-DK' },
  ES: { code: 'ES', label: 'Spain', currency: 'EUR', vatCountryCode: 'ES', flag: '🇪🇸', locale: 'es-ES' },
  FI: { code: 'FI', label: 'Finland', currency: 'EUR', vatCountryCode: 'FI', flag: '🇫🇮', locale: 'fi-FI' },
  FR: { code: 'FR', label: 'France', currency: 'EUR', vatCountryCode: 'FR', flag: '🇫🇷', locale: 'fr-FR' },
  IE: { code: 'IE', label: 'Ireland', currency: 'EUR', vatCountryCode: 'IE', flag: '🇮🇪', locale: 'en-IE' },
  PL: { code: 'PL', label: 'Poland', currency: 'PLN', vatCountryCode: 'PL', flag: '🇵🇱', locale: 'pl-PL' },
  NL: { code: 'NL', label: 'Netherlands', currency: 'EUR', vatCountryCode: 'NL', flag: '🇳🇱', locale: 'nl-NL' },
  PT: { code: 'PT', label: 'Portugal', currency: 'EUR', vatCountryCode: 'PT', flag: '🇵🇹', locale: 'pt-PT' },
  SI: { code: 'SI', label: 'Slovenia', currency: 'EUR', vatCountryCode: 'SI', flag: '🇸🇮', locale: 'sl-SI' },
  SK: { code: 'SK', label: 'Slovakia', currency: 'EUR', vatCountryCode: 'SK', flag: '🇸🇰', locale: 'sk-SK' },
  SE: { code: 'SE', label: 'Sweden', currency: 'SEK', vatCountryCode: 'SE', flag: '🇸🇪', locale: 'sv-SE' },
  CH: { code: 'CH', label: 'Switzerland', currency: 'CHF', vatCountryCode: 'CH', flag: '🇨🇭', locale: 'de-CH' },
};
