"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { THEMES } from "@/app/themes";
import type { UserTheme } from "@/types/usertheme";
import { X, Plus, Edit2, Check } from "lucide-react";
import ThemeEditorModal from "@/components/settings/ThemeEditorModal";
import {
  StarCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/StarCard";
import { useAlert } from "@/context/AlertContext";
import { useConfirm } from "@/context/ConfirmContext";

interface ThemeDescriptor {
  key: string;
  name: string;
  type: string;
  css?: string;
  id?: string;
}

type GroupedThemes = Record<string, ThemeDescriptor[]>;

const ColorSwatch = ({ color, label }: { color: string; label: string }) => {
  return (
    <div className="flex flex-col items-center group/swatch">
      <div
        className="w-8 h-8 rounded-md border border-border transition-transform group-hover/swatch:scale-110 shadow-sm"
        style={{ backgroundColor: color }}
        title={color}
      />
      <span className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover/swatch:opacity-100 transition-opacity absolute -bottom-4 bg-background px-1 rounded shadow-sm z-10 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

const getThemeColor = (themeClass: string, colorVar: string): string => {
  const tempElement = document.createElement("div");
  tempElement.className = themeClass;
  tempElement.style.position = "absolute";
  tempElement.style.visibility = "hidden";
  document.body.appendChild(tempElement);

  const computedStyle = getComputedStyle(tempElement);
  const colorValue = computedStyle.getPropertyValue(colorVar).trim();

  document.body.removeChild(tempElement);
  return colorValue || "transparent";
};

const ThemeSection = ({
  title,
  description,
  themes,
  currentTheme,
  themeColors,
  onSwitch,
}: {
  title: string;
  description: string;
  themes: ThemeDescriptor[] | undefined;
  currentTheme: string | undefined;
  themeColors: Record<string, any>;
  onSwitch: (key: string) => void;
}) => {
  if (!themes || themes.length === 0) return null;

  return (
    <StarCard>
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map(({ key, name }: ThemeDescriptor) => {
            const isCurrent = currentTheme === key;
            const colors = themeColors[key];

            // Fallback colors if loading
            const bg = colors?.background || "hsl(var(--background))";
            const prim = colors?.primary || "hsl(var(--primary))";
            const sec = colors?.secondary || "hsl(var(--secondary))";
            const acc = colors?.accent || "hsl(var(--accent))";

            return (
              <div
                key={name}
                onClick={() => onSwitch(key)}
                className={`
                    group/theme cursor-pointer relative flex flex-col gap-3
                `}
              >
                {/* Visual Preview Container */}
                <div
                  className={`
                        relative w-full aspect-16/10 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md
                        ${
                          isCurrent
                            ? "border-primary ring-4 ring-primary/20 scale-[1.02]"
                            : "border-border/50 group-hover/theme:border-primary/50 group-hover/theme:shadow-lg group-hover/theme:-translate-y-1"
                        }
                    `}
                  style={{ backgroundColor: bg }}
                >
                  {/* Mini Layout Simulation */}
                  <div className="absolute inset-0 flex">
                    {/* Sidebar */}
                    <div
                      className="w-1/4 h-full border-r border-white/10 flex flex-col gap-2 p-2"
                      style={{ backgroundColor: sec }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 mb-2" />
                      <div className="w-full h-2 rounded-full bg-white/10" />
                      <div className="w-3/4 h-2 rounded-full bg-white/10" />
                      <div className="w-full h-2 rounded-full bg-white/10 mt-auto" />
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                      {/* Header */}
                      <div className="h-8 border-b border-white/5 flex items-center px-3 gap-2">
                        <div className="w-16 h-2 rounded-full bg-current opacity-10" />
                      </div>
                      {/* Body */}
                      <div className="flex-1 p-3 gap-2 flex flex-col">
                        <div className="w-full h-24 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden">
                          {/* Accent usage */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{ backgroundColor: acc }}
                          />
                          <div className="w-1/2 h-2 rounded-full opacity-20 bg-current" />
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <div
                            className="flex-1 h-8 rounded-md"
                            style={{ backgroundColor: prim }}
                          />
                          <div className="w-8 h-8 rounded-md border border-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Check Overlay */}
                  {isCurrent && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex flex-col">
                    <span
                      className={`font-semibold text-sm ${
                        isCurrent ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {name}
                    </span>
                    {/* Colors */}
                    {/* <div className="flex gap-1 mt-1.5">
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: prim }}
                        title="Primary"
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: sec }}
                        title="Secondary"
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: acc }}
                        title="Accent"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </StarCard>
  );
};

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const { showAlert } = useAlert();
  const confirm = useConfirm();
  const [themeColors, setThemeColors] = useState<
    Record<
      string,
      { primary: string; secondary: string; accent: string; background: string }
    >
  >({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<UserTheme | null>(null);
  const [refreshColors, setRefreshColors] = useState(0);
  const [allThemes, setAllThemes] = useState<any[]>([]);
  const [injectedClass, setInjectedClass] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchColors = () => {
      const colors: Record<
        string,
        {
          primary: string;
          secondary: string;
          accent: string;
          background: string;
        }
      > = {};
      const userThemes = JSON.parse(
        localStorage.getItem("user-themes") || "[]"
      ).map((theme: UserTheme) => {
        const match = theme.css.match(/\.([^\s{]+)/);
        return {
          name: theme.name,
          key: match ? match[1] : null,
          type: "User",
          css: theme.css,
          id: theme.id,
        };
      });
      const all = [...THEMES, ...userThemes];
      setAllThemes(all);

      all.forEach(({ key, css }) => {
        let tempStyle: HTMLStyleElement | null = null;
        if (css && key?.startsWith("user-")) {
          tempStyle = document.createElement("style");
          tempStyle.id = `temp-user-theme-${key}`;
          tempStyle.textContent = css;
          document.head.appendChild(tempStyle);
        }

        colors[key] = {
          primary: getThemeColor(key, "--primary"),
          secondary: getThemeColor(key, "--secondary"),
          accent: getThemeColor(key, "--accent"),
          background: getThemeColor(key, "--background"),
        };

        if (tempStyle) {
          document.head.removeChild(tempStyle);
        }
      });

      setThemeColors(colors);
    };

    fetchColors();
  }, [refreshColors]);

  const switchTheme = (key: string) => {
    const userTheme = allThemes.find((t) => t.key === key && t.type === "User");
    if (userTheme) {
      const classMatch = userTheme.css.match(/\.([^\s{]+)/);
      const className = classMatch ? classMatch[1] : key;

      if (!document.getElementById(`user-theme-${className}`)) {
        const style = document.createElement("style");
        style.id = `user-theme-${className}`;
        style.textContent = userTheme.css;
        document.head.appendChild(style);
      }

      if (injectedClass && injectedClass !== className) {
        const old = document.getElementById(`user-theme-${injectedClass}`);
        if (old) old.remove();
      }

      document.documentElement.className = className;
      setInjectedClass(className);
      setTheme(className);
    } else {
      if (injectedClass) {
        const el = document.getElementById(`user-theme-${injectedClass}`);
        if (el) el.remove();
        setInjectedClass(null);
      }
      setTheme(key);
    }
  };

  const groupedThemes = allThemes.reduce((acc, t) => {
    if (!acc[t.type]) acc[t.type] = [];
    acc[t.type].push(t);
    return acc;
  }, {} as GroupedThemes);

  const handleSaveTheme = (updatedTheme: UserTheme) => {
    const existingThemes = JSON.parse(
      localStorage.getItem("user-themes") || "[]"
    );
    const themesArray = Array.isArray(existingThemes) ? existingThemes : [];

    // Use existing ID or generate a new one
    const id = updatedTheme.id || crypto.randomUUID();

    // Generate class name based on ID to ensure uniqueness
    const newClass = `user-theme-${id}`;

    // Replace the old class name in the CSS with the new ID-based class
    // This matches .user-xyz { ... } or .user-theme-abc { ... }
    const newCss = updatedTheme.css.replace(/\.([^\s{]+)/, `.${newClass}`);

    const themeToSave = {
      ...updatedTheme,
      id,
      key: newClass,
      css: newCss,
    };

    const index = themesArray.findIndex((t) => t.id === id);
    if (index >= 0) {
      themesArray[index] = themeToSave;
    } else {
      // Fallback: check by name if ID match failed (legacy themes) but update them with ID
      const nameIndex = themesArray.findIndex(
        (t) => t.name === updatedTheme.name
      );
      if (nameIndex >= 0) {
        themesArray[nameIndex] = themeToSave;
      } else {
        themesArray.push(themeToSave);
      }
    }

    localStorage.setItem("user-themes", JSON.stringify(themesArray));
    setRefreshColors((prev) => prev + 1);
    setIsModalOpen(false);
    setEditingTheme(null);
    showAlert({
      type: "success",
      title: "Theme Saved",
      message: `Theme "${themeToSave.name}" has been saved successfully.`,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Appearance</h1>
          <p className="text-muted-foreground">
            Customize the look and feel of your workspace.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm">
          <span className="text-sm text-muted-foreground">Current Theme:</span>
          <span className="font-semibold text-primary">
            {mounted
              ? THEMES.find((t) => t.key === theme)?.name || theme
              : "Loading..."}
          </span>
        </div>
      </div>

      <ThemeSection
        title="Light Themes"
        description="Bright and clear themes."
        themes={groupedThemes.light}
        currentTheme={theme}
        themeColors={themeColors}
        onSwitch={switchTheme}
      />

      <ThemeSection
        title="Dark Themes"
        description="Easy on the eyes."
        themes={groupedThemes.dark}
        currentTheme={theme}
        themeColors={themeColors}
        onSwitch={switchTheme}
      />

      {/* User Themes */}
      <StarCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle>My Themes</CardTitle>
            <CardDescription>Custom themes you have created.</CardDescription>
          </div>
          <Button
            onClick={() => {
              setEditingTheme(null);
              setIsModalOpen(true);
            }}
            size="sm"
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Create New
          </Button>
        </CardHeader>
        <CardContent>
          {!groupedThemes.User || groupedThemes.User.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
              <p>You haven't created any custom themes yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-1.5">
              {groupedThemes.User.map(({ key, name, id }: ThemeDescriptor) => {
                const isCurrent = theme === key;
                const colors = themeColors[key];

                // Fallback colors if loading
                const bg = colors?.background || "hsl(var(--background))";
                const prim = colors?.primary || "hsl(var(--primary))";
                const sec = colors?.secondary || "hsl(var(--secondary))";
                const acc = colors?.accent || "hsl(var(--accent))";

                return (
                  <div
                    key={id || key}
                    onClick={() => switchTheme(key)}
                    className={`
                        group/theme cursor-pointer relative flex flex-col gap-3
                    `}
                  >
                    {/* Visual Preview Container */}
                    <div
                      className={`
                            relative w-full aspect-16/10 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md
                            ${
                              isCurrent
                                ? "border-primary ring-4 ring-primary/20 scale-[1.02]"
                                : "border-border/50 group-hover/theme:border-primary/50 group-hover/theme:shadow-lg group-hover/theme:-translate-y-1"
                            }
                        `}
                      style={{ backgroundColor: bg }}
                    >
                      {/* Mini Layout Simulation */}
                      <div className="absolute inset-0 flex">
                        {/* Sidebar */}
                        <div
                          className="w-1/4 h-full border-r border-white/10 flex flex-col gap-2 p-2"
                          style={{ backgroundColor: sec }}
                        >
                          <div className="w-8 h-8 rounded-full bg-white/10 mb-2" />
                          <div className="w-full h-2 rounded-full bg-white/10" />
                          <div className="w-3/4 h-2 rounded-full bg-white/10" />
                          <div className="w-full h-2 rounded-full bg-white/10 mt-auto" />
                        </div>
                        {/* Main Content */}
                        <div className="flex-1 flex flex-col">
                          {/* Header */}
                          <div className="h-8 border-b border-white/5 flex items-center px-3 gap-2">
                            <div className="w-16 h-2 rounded-full bg-current opacity-10" />
                          </div>
                          {/* Body */}
                          <div className="flex-1 p-3 gap-2 flex flex-col">
                            <div className="w-full h-24 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden">
                              {/* Accent usage */}
                              <div
                                className="absolute inset-0 opacity-10"
                                style={{ backgroundColor: acc }}
                              />
                              <div className="w-1/2 h-2 rounded-full opacity-20 bg-current" />
                            </div>
                            <div className="flex gap-2 mt-auto">
                              <div
                                className="flex-1 h-8 rounded-md"
                                style={{ backgroundColor: prim }}
                              />
                              <div className="w-8 h-8 rounded-md border border-white/10" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Active Check Overlay */}
                      {isCurrent && (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[1px] pointer-events-none">
                          <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in">
                            <Check className="w-5 h-5" />
                          </div>
                        </div>
                      )}

                      {/* Hover Actions Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover/theme:opacity-100 transition-opacity bg-black/20 flex items-center justify-center gap-2 backdrop-blur-[1px]">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-9 w-9 p-0 rounded-full shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            const themeToEdit = allThemes.find(
                              (t) => t.key === key && t.type === "User"
                            );
                            if (themeToEdit) {
                              setEditingTheme({
                                name: themeToEdit.name,
                                css: themeToEdit.css,
                                id: themeToEdit.id,
                              });
                              setIsModalOpen(true);
                            }
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-9 w-9 p-0 rounded-full shadow-lg"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const isConfirmed = await confirm({
                              title: "Delete Theme",
                              message: `Are you sure you want to delete "${name}"?`,
                              confirmText: "Delete",
                              variant: "destructive",
                            });

                            if (!isConfirmed) return;

                            const existingThemes = JSON.parse(
                              localStorage.getItem("user-themes") || "[]"
                            ) as UserTheme[];
                            const updatedThemes = existingThemes.filter(
                              (t) => t.name !== name
                            );
                            localStorage.setItem(
                              "user-themes",
                              JSON.stringify(updatedThemes)
                            );

                            const themeToDelete = allThemes.find(
                              (t) => t.key === key && t.type === "User"
                            );
                            if (themeToDelete) {
                              const classMatch =
                                themeToDelete.css.match(/\.([^\s{]+)/);
                              const className = classMatch
                                ? classMatch[1]
                                : key;
                              const styleTag = document.getElementById(
                                `user-theme-${className}`
                              );
                              if (styleTag) styleTag.remove();
                              if (isCurrent) setTheme("dark");
                              if (injectedClass === className)
                                setInjectedClass(null);
                            }
                            setRefreshColors((prev) => prev + 1);
                            showAlert({
                              type: "info",
                              title: "Theme Deleted",
                              message: `Theme "${name}" has been removed.`,
                            });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex flex-col">
                        <span
                          className={`font-semibold text-sm ${
                            isCurrent ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {name}
                        </span>
                        {/* Colors */}
                        {/* <div className="flex gap-1 mt-1.5">
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: prim }}
                            title="Primary"
                          />
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: sec }}
                            title="Secondary"
                          />
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: acc }}
                            title="Accent"
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </StarCard>

      <ThemeEditorModal
        key={
          isModalOpen
            ? editingTheme
              ? `edit-${editingTheme.name}`
              : "create"
            : "closed"
        }
        theme={editingTheme}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTheme(null);
        }}
        onSave={handleSaveTheme}
      />
    </div>
  );
}
