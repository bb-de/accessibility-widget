import { useState, useEffect, useRef } from "react";
import { ProfilesTab } from "./ProfilesTab";
import { VisionTab } from "./VisionTab";
import { ContentTab } from "./ContentTab";
import { NavigationTab } from "./NavigationTab";
import { WidgetFooter } from "./WidgetFooter";
import { LanguageSelector } from "./LanguageSelector";
import { AccessibleLogoInline } from "./AccessibleLogoInline";
import { useAccessibility } from "./hooks/useAccessibility";
import { useIsMobile } from "./hooks/use-mobile";

import {
  UserCog,
  Eye,
  FileText,
  Compass,
  RotateCcw,
  X
} from "lucide-react";

interface WidgetPanelProps {
  isOpen: boolean;
}

type TabType = "profiles" | "vision" | "content" | "navigation";

export function WidgetPanel({ isOpen }: WidgetPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profiles");
  const { toggleWidget, resetSettings, translations } = useAccessibility();
  const isMobile = useIsMobile();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div
      id="accessibility-panel"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className={`fixed top-10 right-4 bg-white rounded-xl shadow-lg transition-all duration-300 transform z-[9999] ${
        isOpen ? "translate-y-0 opacity-100 visible" : "translate-y-[-100%] opacity-0 invisible"
      }`}
      style={{
        width: isMobile ? "95vw" : "340px",
        minWidth: isMobile ? "95vw" : "340px",
        maxWidth: isMobile ? "95vw" : "340px",
        maxHeight: "90vh",
        overflowY: "scroll",
        scrollBehavior: "smooth"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AccessibleLogoInline className="mr-2" />
          </div>
          <div className="flex space-x-2">
            <button
              id="reset-btn"
              aria-label={translations.resetAllSettings}
              className="text-sm text-gray-500 hover:text-gray-700 p-1 rounded flex items-center"
              onClick={resetSettings}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              {translations.reset}
            </button>
            <button
              id="close-panel-btn"
              aria-label={translations.closeAccessibilityMenu}
              className="text-gray-500 hover:text-gray-700 p-1 rounded flex items-center"
              onClick={toggleWidget}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Language Selector with Flags */}
        <div className="mt-3 flex justify-end">
          <LanguageSelector />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-gray-50 rounded-t-lg overflow-x-auto">
        {(
          [
            { key: "profiles", icon: <UserCog className="h-5 w-5 mb-1" />, label: translations.profiles },
            { key: "vision", icon: <Eye className="h-5 w-5 mb-1" />, label: translations.vision },
            { key: "content", icon: <FileText className="h-5 w-5 mb-1" />, label: translations.content },
            { key: "navigation", icon: <Compass className="h-5 w-5 mb-1" />, label: translations.navigation }
          ] as const
        ).map(({ key, icon, label }) => (
          <button
            key={key}
            className={`flex-1 py-3 px-2 text-sm font-medium ${
              activeTab === key ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange(key)}
            aria-selected={activeTab === key}
          >
            <div className="flex flex-col items-center">
              {icon}
              <span>{label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="overflow-y-visible">
        {activeTab === "profiles" && <ProfilesTab />}
        {activeTab === "vision" && <VisionTab />}
        {activeTab === "content" && <ContentTab />}
        {activeTab === "navigation" && <NavigationTab />}
      </div>

      {/* Panel Footer */}
      <WidgetFooter />
    </div>
  );
}
