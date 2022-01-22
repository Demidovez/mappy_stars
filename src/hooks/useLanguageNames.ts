import {useEffect, useState} from "react";

// Определяем язык названий
export default function useLanguageNames(langNames: string): string {
  const [language, setLanguage] = useState(langNames);

  useEffect(() => {
    if (langNames !== language)
      new Promise((resolve: Function) => {
        setTimeout(() => {
          setLanguage(langNames);
          resolve();
        }, 100);
      });
  }, [langNames]);

  return language;
}
