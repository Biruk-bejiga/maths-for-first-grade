import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import language files
import en from './locales/en.json';
import am from './locales/am.json';
import om from './locales/om.json';

const resources = {
  en: { translation: en },
  am: { translation: am },
  om: { translation: om },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: Localization.locale.split('-')[0] || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

