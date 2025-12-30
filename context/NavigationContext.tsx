import { navItems } from "@/config/navbarConfig";
import { NavbarConfig, NavItem, NavSection } from "@/types/navbar";
import { createContext, ReactNode, useCallback, useState } from "react";
import {
  LayoutDashboard,
  Settings,
  User,
  Shield,
  Palette,
  Code,
} from "lucide-react";

interface NavigationContextType {
  navbarConfig: NavbarConfig;
  insertSection: (section: NavSection, position?: number) => void;
  insertItem: (sectionName: string, item: NavItem) => void;
  insertChild: (
    sectionName: string,
    parentLabel: string,
    child: NavItem
  ) => void;
  removeSection: (sectionName: string) => void;
  removeItem: (sectionName: string, itemLabel: string) => void;
  removeChild: (
    sectionName: string,
    parentLabel: string,
    childLabel: string
  ) => void;
  updateBadge: (sectionName: string, itemLabel: string, badge: string) => void;
  updateChildBadge: (
    sectionName: string,
    parentLabel: string,
    childLabel: string,
    badge: string
  ) => void;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>(navItems);

  // Helper to deep clone or map through sections to maintain immutability
  const insertSection = useCallback(
    (section: NavSection, position: number = 0) => {
      setNavbarConfig((prev) => {
        const newConfig = [...prev];
        newConfig.splice(position, 0, section);
        return newConfig;
      });
    },
    []
  );

  const insertItem = useCallback((sectionName: string, item: NavItem) => {
    setNavbarConfig((prev) =>
      prev.map((s) =>
        s.section === sectionName ? { ...s, items: [...s.items, item] } : s
      )
    );
  }, []);

  const insertChild = useCallback(
    (sectionName: string, parentLabel: string, child: NavItem) => {
      setNavbarConfig((prev) =>
        prev.map((s) => {
          if (s.section !== sectionName) return s;
          return {
            ...s,
            items: s.items.map((i) =>
              i.label === parentLabel
                ? { ...i, children: [...(i.children || []), child] }
                : i
            ),
          };
        })
      );
    },
    []
  );

  const removeSection = useCallback((sectionName: string) => {
    setNavbarConfig((prev) => prev.filter((s) => s.section !== sectionName));
  }, []);

  const removeItem = useCallback((sectionName: string, itemLabel: string) => {
    setNavbarConfig((prev) =>
      prev.map((s) => {
        if (s.section !== sectionName) return s;
        return {
          ...s,
          items: s.items.filter((i) => i.label !== itemLabel),
        };
      })
    );
  }, []);

  const removeChild = useCallback(
    (sectionName: string, parentLabel: string, childLabel: string) => {
      setNavbarConfig((prev) =>
        prev.map((s) => {
          if (s.section !== sectionName) return s;
          return {
            ...s,
            items: s.items.map((i) => {
              if (i.label !== parentLabel) return i;
              return {
                ...i,
                children: i.children?.filter((c) => c.label !== childLabel),
              };
            }),
          };
        })
      );
    },
    []
  );

  const updateBadge = useCallback(
    (sectionName: string, itemLabel: string, badge: string) => {
      setNavbarConfig((prev) =>
        prev.map((s) => {
          if (s.section !== sectionName) return s;
          return {
            ...s,
            items: s.items.map((i) =>
              i.label === itemLabel ? { ...i, badge } : i
            ),
          };
        })
      );
    },
    []
  );

  const updateChildBadge = useCallback(
    (
      sectionName: string,
      parentLabel: string,
      childLabel: string,
      badge: string
    ) => {
      setNavbarConfig((prev) =>
        prev.map((s) => {
          if (s.section !== sectionName) return s;
          return {
            ...s,
            items: s.items.map((i) => {
              if (i.label !== parentLabel) return i;
              return {
                ...i,
                children: i.children?.map((c) =>
                  c.label === childLabel ? { ...c, badge } : c
                ),
              };
            }),
          };
        })
      );
    },
    []
  );

  return (
    <NavigationContext.Provider
      value={{
        navbarConfig,
        insertSection,
        insertItem,
        insertChild,
        removeSection,
        removeItem,
        removeChild,
        updateBadge,
        updateChildBadge,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
