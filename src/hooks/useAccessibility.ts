import { useEffect, useState } from 'react';

export type AccessibilitySettings = {
  [key: string]: any;
};

const STORAGE_KEY = 'a11y-widget-settings';
const LANGUAGE_KEY = 'a11y-language';

// Voreinstellungen für Barrierefreiheit
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

// Übersetzungen für verschiedene Sprachen
const translationsMap: Record<'de' | 'en' | 'fr' | 'es', Record<string, string>> = {
  de: {
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
    darkMode: 'Dunkelmodus',
    hideImages: 'Bilder ausblenden',
    stopAnimations: 'Animationen stoppen',
    resetSettings: 'Alle Einstellungen zurücksetzen',
    footerText: 'Ein Service für barrierefreie Inhalte',
    statement: 'Erklärung',
    privacy: 'Datenschutz',
    help: 'Hilfe',
    keyboardShortcut: 'Tastenkürzel',
    closeAccessibilityMenu: 'Barrierefreiheitsmenü schließen',
    toggleDarkMode: 'Dunkelmodus umschalten',
    toggleHighlightTitles: 'Überschriften hervorheben umschalten',
    toggleHighlightLinks: 'Links hervorheben umschalten',
    toggleTextToSpeech: 'Vorlesen umschalten',
    // ...
  },
  en: {
    reset: 'Reset',
    resetAllSettings: 'Reset all settings',
    accessibilityProfiles: 'Accessibility Profiles',
    profiles: 'Profiles',
    vision: 'Vision',
    content: 'Content',
    navigation: 'Navigation',
    readableFont: 'Readable Font',
    dyslexiaFont: 'Dyslexia Font',
    resetFont: 'Default',
    textToSpeech: 'Text to Speech',
    highlightTitles: 'Highlight Titles',
    highlightLinks: 'Highlight Links',
    readingMask: 'Reading Mask',
    readingGuide: 'Reading Guide',
    fontAdjustments: 'Font Adjustments',
    alignmentSpacing: 'Alignment & Spacing',
    textAlignLeft: 'Left',
    textAlignCenter: 'Center',
    textAlignRight: 'Right',
    darkMode: 'Dark Mode',
    hideImages: 'Hide Images',
    stopAnimations: 'Stop Animations',
    resetSettings: 'Reset All Settings',
    footerText: 'A service for accessible content',
    statement: 'Statement',
    privacy: 'Privacy',
    help: 'Help',
    keyboardShortcut: 'Keyboard Shortcut',
    closeAccessibilityMenu: 'Close accessibility menu',
    toggleDarkMode: 'Toggle dark mode',
    toggleHighlightTitles: 'Toggle highlight titles',
    toggleHighlightLinks: 'Toggle highlight links',
    toggleTextToSpeech: 'Toggle text to speech',
    // ...
  },
  fr: {
    reset: 'Réinitialiser',
    resetAllSettings: 'Réinitialiser tous les paramètres',
    accessibilityProfiles: 'Profils d’accessibilité',
    profiles: 'Profils',
    vision: 'Vision',
    content: 'Contenu',
    navigation: 'Navigation',
    readableFont: 'Police lisible',
    dyslexiaFont: 'Police dyslexie',
    resetFont: 'Par défaut',
    textToSpeech: 'Lecture à haute voix',
    highlightTitles: 'Surligner les titres',
    highlightLinks: 'Surligner les liens',
    readingMask: 'Masque de lecture',
    readingGuide: 'Guide de lecture',
    fontAdjustments: 'Ajustements de police',
    alignmentSpacing: 'Alignement & Espacement',
    textAlignLeft: 'Gauche',
    textAlignCenter: 'Centre',
    textAlignRight: 'Droite',
    darkMode: 'Mode sombre',
    hideImages: 'Masquer les images',
    stopAnimations: 'Stopper les animations',
    resetSettings: 'Réinitialiser tous les paramètres',
    footerText: 'Un service pour le contenu accessible',
    statement: 'Déclaration',
    privacy: 'Confidentialité',
    help: 'Aide',
    keyboardShortcut: 'Raccourci clavier',
    closeAccessibilityMenu: 'Fermer le menu accessibilité',
    toggleDarkMode: 'Basculer mode sombre',
    toggleHighlightTitles: 'Basculer surlignage titres',
    toggleHighlightLinks: 'Basculer surlignage liens',
    toggleTextToSpeech: 'Basculer lecture vocale',
    // ...
  },
  es: {
    reset: 'Restablecer',
    resetAllSettings: 'Restablecer todos los ajustes',
    accessibilityProfiles: 'Perfiles de accesibilidad',
    profiles: 'Perfiles',
    vision: 'Visión',
    content: 'Contenido',
    navigation: 'Navegación',
    readableFont: 'Fuente legible',
    dyslexiaFont: 'Fuente dislexia',
    resetFont: 'Predeterminado',
    textToSpeech: 'Texto a voz',
    highlightTitles: 'Resaltar títulos',
    highlightLinks: 'Resaltar enlaces',
    readingMask: 'Máscara de lectura',
    readingGuide: 'Guía de lectura',
    fontAdjustments: 'Ajustes de fuente',
    alignmentSpacing: 'Alineación y espaciado',
    textAlignLeft: 'Izquierda',
    textAlignCenter: 'Centro',
    textAlignRight: 'Derecha',
    darkMode: 'Modo oscuro',
    hideImages: 'Ocultar imágenes',
    stopAnimations: 'Detener animaciones',
    resetSettings: 'Restablecer todos los ajustes',
    footerText: 'Un servicio para contenido accesible',
    statement: 'Declaración',
    privacy: 'Privacidad',
    help: 'Ayuda',
    keyboardShortcut: 'Atajo de teclado',
    closeAccessibilityMenu: 'Cerrar menú de accesibilidad',
    toggleDarkMode: 'Alternar modo oscuro',
    toggleHighlightTitles: 'Alternar resaltar títulos',
    toggleHighlightLinks: 'Alternar resaltar enlaces',
    toggleTextToSpeech: 'Alternar texto a voz',
    // ...
  }
};

export function useAccessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [language, setLanguageState] = useState<'de' | 'en' | 'fr' | 'es'>('de');
  const [translations, setTranslations] = useState(translationsMap['de']);

  // Settings laden
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch {
        console.warn('Fehler beim Parsen der Settings');
      }
    }

    const savedLang = localStorage.getItem(LANGUAGE_KEY) as 'de' | 'en' | 'fr' | 'es';
    if (savedLang && translationsMap[savedLang]) {
      setLanguageState(savedLang);
      setTranslations(translationsMap[savedLang]);
    }
  }, []);

  // Settings speichern
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Sprache speichern und Übersetzung setzen
  const setLanguage = (lang: 'de' | 'en' | 'fr' | 'es') => {
    if (translationsMap[lang]) {
      setLanguageState(lang);
      setTranslations(translationsMap[lang]);
      localStorage.setItem(LANGUAGE_KEY, lang);
    }
  };

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
