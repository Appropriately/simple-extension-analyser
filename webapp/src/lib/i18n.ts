import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enGB from "../locales/en-GB.json";
import roRO from "../locales/ro-RO.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en-GB",
  lng: navigator.language,
  resources: {
    "en-GB": {
      translation: enGB,
    },
    "ro-RO": {
      translation: roRO,
    },
  },
});

export default i18n;
