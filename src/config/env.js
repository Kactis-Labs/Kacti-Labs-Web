/**
 * Centralized environment configuration.
 * All VITE_ variables are inlined at build time by Vite — safe for the browser.
 * API keys here are public-facing (Web3Forms is designed this way).
 * Never put server-side secrets in VITE_ variables.
 */

export const ENV = {
  /** Web3Forms access key — get yours free at https://web3forms.com */
  WEB3FORMS_KEY: import.meta.env.VITE_WEB3FORMS_KEY || '',

  /** WhatsApp phone number in international format without + or spaces */
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || '51999999999',
};

/**
 * Pre-built WhatsApp URL with a default message
 * @param {string} [message] - Optional custom message
 */
export const getWhatsAppURL = (message = 'Hola%2C%20me%20interesa%20cotizar%20una%20página%20web%20con%20Kacti%20Labs') =>
  `https://wa.me/${ENV.WHATSAPP_NUMBER}?text=${message}`;
