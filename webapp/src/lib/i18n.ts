import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enGB from "../locales/en-GB.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en-GB",
  resources: {
    "en-GB": {
      translation: enGB,
    },
  },
});

export default i18n;
