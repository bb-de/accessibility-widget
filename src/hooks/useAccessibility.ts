import { useEffect, useState } from 'react';
import { AccessibilitySettings } from '@/contexts/AccessibilityContext';

const STORAGE_KEY = 'a11y-widget-settings';

export function useAccessibilitySettings(defaults: AccessibilitySettings) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaults);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaults, ...parsed });
      } catch {
        console.warn('Invalid settings in localStorage');
      }
    }
  }, []);

  // Save to localStorage on settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaults);
  };

  const incrementSetting = (key: keyof AccessibilitySettings) => {
    if (typeof settings[key] === 'number') {
      updateSetting(key as any, (settings[key] as number) + 1);
    }
  };

  const decrementSetting = (key: keyof AccessibilitySettings) => {
    if (typeof settings[key] === 'number') {
      updateSetting(key as any, (settings[key] as number) - 1);
    }
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    incrementSetting,
    decrementSetting
  };
}
