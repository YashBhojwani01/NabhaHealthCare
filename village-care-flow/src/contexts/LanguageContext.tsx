import React, { createContext, useContext, useMemo, useState } from 'react';

type Language = 'en' | 'hi' | 'pa';

interface LanguageContextValue {
  currentLanguage: Language;
  setLanguage: (lang: Language | string) => void;
  t: (key: string) => string;
  speak: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const dictionary: Record<Language, Record<string, string>> = {
  en: {
    'nav.consultations': 'Consultations',
    'nav.medications': 'Medications',
    'nav.records': 'Records',
    'nav.pharmacies': 'Pharmacies',
    'dashboard.welcome': 'Welcome back, Rajesh',
  },
  hi: {
    'nav.consultations': 'परामर्श',
    'nav.medications': 'दवाइयां',
    'nav.records': 'रिकॉर्ड',
    'nav.pharmacies': 'फार्मेसी',
    'dashboard.welcome': 'वापसी पर स्वागत है, राजेश',
  },
  pa: {
    'nav.consultations': 'ਸਲਾਹ-ਮਸ਼ਵਰਾ',
    'nav.medications': 'ਦਵਾਈਆਂ',
    'nav.records': 'ਰਿਕਾਰਡ',
    'nav.pharmacies': 'ਫਾਰਮੇਸੀ',
    'dashboard.welcome': 'ਵਾਪਸੀ ਤੇ ਸੁਆਗਤ, ਰਾਜੇਸ਼',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const value = useMemo<LanguageContextValue>(() => ({
    currentLanguage,
    setLanguage: (lang) => setCurrentLanguage((lang as Language) ?? 'en'),
    t: (key) => dictionary[currentLanguage][key] ?? key,
    speak: (text) => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utter);
      }
    }
  }), [currentLanguage]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};


