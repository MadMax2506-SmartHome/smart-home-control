import I18n from 'react-native-i18n';
import de from './locales/de.js';
import en from './locales/en.js';

I18n.fallbacks = true;

I18n.translations = {
  de,
  en,
};

export default I18n;
