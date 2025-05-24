import { useState } from 'react';

export function useWidgetToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => setIsOpen(prev => !prev);
  const closeWidget = () => setIsOpen(false);

  return {
    isOpen,
    toggleWidget,
    closeWidget
  };
}
