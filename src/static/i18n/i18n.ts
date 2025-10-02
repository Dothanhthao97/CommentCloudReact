// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // Sử dụng lại initReactI18next

const resources = {
  en: {
    translation: {
      "reply": "Reply",
      "send": "Send"
    }
  },
  vi: {
    translation: {
      "reply": "Hồi đáp",
      "send": "Gửi"
    }
  }
};

i18n
  .use(initReactI18next)  // Kết nối i18n với React
  .init({
    resources,
    lng: "en",  // Ngôn ngữ mặc định
    fallbackLng: "en",  // Ngôn ngữ thay thế nếu không có ngôn ngữ cụ thể
    interpolation: {
      escapeValue: false // React tự xử lý XSS
    }
  });

export default i18n;
