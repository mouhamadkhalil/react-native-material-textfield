import { I18nManager } from "react-native";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require("../translations/ar.json"),
  en: () => require("../translations/en.json"),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {

  // fallback if no available language fits
  const languageTag = Localization.locale, isRTL = false;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    en :require("../translations/en.json"),
    ar :require("../translations/ar.json")
  };
  i18n.locale = languageTag;
  i18n.fallbacks = true;
};


export { translate, setI18nConfig } 