import { NavigationContext } from "@/context/NavigationContext";
import { useContext } from "react";

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
}
