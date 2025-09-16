import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(true);

  return (
    <LanguageContext.Provider value={{ showLanguageSwitcher, setShowLanguageSwitcher }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);