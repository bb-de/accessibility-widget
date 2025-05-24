import { useEffect } from "react";

export const useAccessibility = () => {
  useEffect(() => {
    console.log("Accessibility hook initialized");
  }, []);
};
