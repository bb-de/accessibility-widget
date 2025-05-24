import { useEffect, useState } from 'react';

export type AccessibilitySettings = {
  [key: string]: any;
};

const STORAGE_KEY = 'a11y-widget-settings';

const defaultSettings: AccessibilitySettings = {
  contrastMode: 'default',
  saturation: 100,
  monochrome: 0,
  textColor: 'default',
  titleColor: 'default',
  backgroundColor: 'default',
  textSize: 0,
  lineHeight: 0,
  letterSpacing: 0,
  darkMode: false,
  hideImages: false,
  stopAnimations: false,
  highlightTitles: false,
  highlightLinks: false,
  textToSpeech: false,
  readingMask: false,
  readingGuide: false,
  fontFamily: 'default',
  wordSpacing: 0,
  textAlign: 'default',
  keyboardNavigation: false,
  highlightFocus: false,
  customCursor: false,
  cursorSize: 'default',
  cursorColor: 'white',
  virtualKeyboard: false,
  pageStructure: false
};

const defaultTranslations = {
  // Beispielwerte – du solltest hier deine realen Übersetzungen ergänzen
  reset: 'Zurücksetzen',
  resetAllSettings: 'Alle Einstellungen zurücksetzen',
  accessibilityProfiles: 'Barrierefreiheits-Profile',
  profiles: 'Profile',
  vision: 'Sehen',
  content: 'Inhalt',
  navigation: 'Navigation',
  readableFont: 'Lesefreundliche Schrift',
  dyslexiaFont: 'Dyslexie-Schrift',
  resetFont: 'Standard',
  textToSpeech: 'Vorlesen',
  highlightTitles: 'Überschriften hervorheben',
  highlightLinks: 'Links hervorheben',
  readingMask: 'Lesemaske',
  readingGuide: 'Leseführer',
  fontAdjustments: 'Schriftanpassungen',
  alignmentSpacing: 'Ausrichtung & Abstand',
  textAlignLeft: 'Links',
  textAlignCenter: 'Zentriert',
  textAlignRight: 'Rechts',
  // etc.
};

export function useAccessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [language, setLanguage] = useState<'de' | 'en' | 'fr' | 'es'>('de');
  const [translations, setTranslations] = useState(defaultTranslations);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.warn('Invalid settings in localStorage');
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleWidget = () => setIsOpen(prev => !prev);
  const closeWidget = () => setIsOpen(false);

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const incrementSetting = (key: keyof AccessibilitySettings) => {
    if (typeof settings[key] === 'number') {
      updateSetting(key, (settings[key] as number) + 1);
    }
  };

  const decrementSetting = (key: keyof AccessibilitySettings) => {
    if (typeof settings[key] === 'number') {
      updateSetting(key, (settings[key] as number) - 1);
    }
  };

  return {
    isOpen,
    toggleWidget,
    closeWidget,
    settings,
    updateSetting,
    resetSettings,
    incrementSetting,
    decrementSetting,
    language,
    setLanguage,
    translations
  };
}
