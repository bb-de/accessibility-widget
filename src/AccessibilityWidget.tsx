import React, { useEffect, useRef } from 'react';
import { WidgetButton } from './WidgetButton';
import { WidgetPanel } from './WidgetPanel';
import { useAccessibility } from './hooks/useAccessibility';

/**
 * Hauptkomponente des Accessibility-Widgets
 * Kombiniert den Button und das Panel mit dem gemeinsamen Zustand
 */
export function AccessibilityWidget() {
  const { isOpen, toggleWidget, closeWidget } = useAccessibility();
  const widgetRef = useRef<HTMLDivElement>(null);
  
  // Event-Listener für Klicks außerhalb des Widgets
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('#accessibility-toggle')
      ) {
        closeWidget();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeWidget]);

  return (
    <>
      <WidgetButton onClick={toggleWidget} isOpen={isOpen} />
      <div ref={widgetRef}>
        <WidgetPanel isOpen={isOpen} />
      </div>
    </>
  );
}

// 🔧 Neu: Default-Export ergänzen, damit der Import in index.tsx funktioniert
export default AccessibilityWidget;
