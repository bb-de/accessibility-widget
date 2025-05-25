// src/lib/accessibility-profiles.ts
import { AccessibilitySettings } from '@/contexts/AccessibilityContext';

interface LocalizedText {
  de: string;
  en: string;
}

export interface AccessibilityProfile {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string; // oder React.ReactNode wenn du mit Icons arbeitest
  settings: Partial<AccessibilitySettings>;
}

export const accessibilityProfiles: AccessibilityProfile[] = [
  {
    id: 'vision',
    title: {
      de: 'Sehbehinderung',
      en: 'Vision Impaired'
    },
    description: {
      de: 'Vergrößerter Text, höherer Kontrast',
      en: 'Larger text, increased contrast'
    },
    icon: '🧑‍🦯',
    settings: {
      textSize: 3,
      contrastMode: 'high',
      highlightLinks: true,
      highlightFocus: true
    }
  },
  {
    id: 'cognitive',
    title: {
      de: 'Kognitive Einschränkung',
      en: 'Cognitive Disability'
    },
    description: {
      de: 'Lesbare Schrift, erhöhte Abstände',
      en: 'Readable font, increased spacing'
    },
    icon: '🧠',
    settings: {
      fontFamily: 'readable',
      lineHeight: 2,
      wordSpacing: 30,
      textAlign: 'left',
      highlightTitles: true
    }
  },
  {
    id: 'senior',
    title: {
      de: 'Seniorenfreundlich',
      en: 'Senior Friendly'
    },
    description: {
      de: 'Größerer Text, hohe Lesbarkeit',
      en: 'Larger text, high readability'
    },
    icon: '👴',
    settings: {
      textSize: 2,
      contrastMode: 'increased',
      fontFamily: 'readable',
      highlightFocus: true,
      highlightLinks: true
    }
  },
  {
    id: 'motor',
    title: {
      de: 'Motorische Einschränkung',
      en: 'Motor Impaired'
    },
    description: {
      de: 'Tastatursteuerung, großer Cursor',
      en: 'Keyboard nav, large cursor'
    },
    icon: '🦽',
    settings: {
      keyboardNavigation: true,
      highlightFocus: true,
      customCursor: true,
      cursorSize: 'bigger',
      cursorColor: 'black'
    }
  }
  // Füge bei Bedarf weitere Profile hinzu
];
