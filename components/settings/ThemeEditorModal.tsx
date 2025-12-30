import { UserTheme } from "@/types/usertheme";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paintbrush, Code, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OklchColorPicker } from "@/components/settings/OklchColorPicker";

// --- Variable Definitions ---
const VARIABLE_GROUPS = [
  {
    name: "Base Colors",
    variables: [
      { name: "--background", label: "Background" },
      { name: "--foreground", label: "Foreground" },
      { name: "--card", label: "Card Background" },
      { name: "--card-foreground", label: "Card Foreground" },
      { name: "--popover", label: "Popover Background" },
      { name: "--popover-foreground", label: "Popover Foreground" },
    ],
  },
  {
    name: "Component Colors",
    variables: [
      { name: "--primary", label: "Primary" },
      { name: "--primary-foreground", label: "Primary Foreground" },
      { name: "--secondary", label: "Secondary" },
      { name: "--secondary-foreground", label: "Secondary Foreground" },
      { name: "--muted", label: "Muted" },
      { name: "--muted-foreground", label: "Muted Foreground" },
      { name: "--accent", label: "Accent" },
      { name: "--accent-foreground", label: "Accent Foreground" },
      { name: "--destructive", label: "Destructive" },
    ],
  },
  {
    name: "Borders & Inputs",
    variables: [
      { name: "--border", label: "Border" },
      { name: "--input", label: "Input" },
      { name: "--ring", label: "Ring" },
    ],
  },
  {
    name: "Sidebar",
    variables: [
      { name: "--sidebar", label: "Sidebar Background" },
      { name: "--sidebar-foreground", label: "Sidebar Foreground" },
      { name: "--sidebar-primary", label: "Sidebar Primary" },
      { name: "--sidebar-primary-foreground", label: "Sidebar Prim. FG" },
      { name: "--sidebar-accent", label: "Sidebar Accent" },
      { name: "--sidebar-accent-foreground", label: "Sidebar Accent FG" },
      { name: "--sidebar-border", label: "Sidebar Border" },
      { name: "--sidebar-ring", label: "Sidebar Ring" },
    ],
  },
  {
    name: "Charts",
    variables: [
      { name: "--chart-1", label: "Chart 1" },
      { name: "--chart-2", label: "Chart 2" },
      { name: "--chart-3", label: "Chart 3" },
      { name: "--chart-4", label: "Chart 4" },
      { name: "--chart-5", label: "Chart 5" },
    ],
  },
  {
    name: "Star Effect",
    variables: [
      { name: "--star-color", label: "Star Color" },
      { name: "--star-card-bg", label: "Star Card BG" },
      { name: "--star-card-border", label: "Star Card Border" },
      { name: "--star-card-border-hover", label: "Star Card Hover" },
    ],
  },
];

const DEFAULT_CSS = `.my-theme {
  --background: oklch(0.97 0.01 260);
  --foreground: oklch(0.2 0.04 260);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.2 0.04 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.2 0.04 260);
  --primary: oklch(0.5 0.2 285);
  --primary-foreground: oklch(0.98 0.01 285);
  --secondary: oklch(0.92 0.02 260);
  --secondary-foreground: oklch(0.3 0.04 260);
  --muted: oklch(0.92 0.02 260);
  --muted-foreground: oklch(0.5 0.04 260);
  --accent: oklch(0.65 0.18 200);
  --accent-foreground: oklch(0.98 0.01 200);
  --destructive: oklch(0.6 0.2 25);
  --border: oklch(0.9 0.02 260);
  --input: oklch(0.9 0.02 260);
  --ring: oklch(0.5 0.2 285);
  --chart-1: oklch(0.5 0.2 285);
  --chart-2: oklch(0.65 0.18 200);
  --chart-3: oklch(0.7 0.15 320);
  --chart-4: oklch(0.85 0.12 80);
  --chart-5: oklch(0.6 0.15 160);
  --sidebar: oklch(0.98 0.01 260);
  --sidebar-foreground: oklch(0.2 0.04 260);
  --sidebar-primary: oklch(0.5 0.2 285);
  --sidebar-primary-foreground: oklch(0.98 0.01 285);
  --sidebar-accent: oklch(0.65 0.18 200);
  --sidebar-accent-foreground: oklch(0.98 0.01 200);
  --sidebar-border: oklch(0.9 0.02 260);
  --sidebar-ring: oklch(0.5 0.2 285);
  --star-color: oklch(0.2 0.04 260);
  --star-card-bg: oklch(1 0 0);
  --star-card-border: oklch(0.9 0.02 260);
  --star-card-border-hover: oklch(0.8 0.02 260);
}`;

// --- Helper Functions ---

// Minimal OKLCH to Hex converter for the color picker (approximate)
// In a real app, you'd want a robust library. For now, we'll try to handle simple conversions
// or rely on the user inputting valid CSS values if the picker doesn't support them perfectly.
// Since standard <input type="color"> only supports Hex, working with OKLCH is tricky visually.
// We will simply treat the inputs as text inputs that *can* accept color picker values if they are Hex.
// If the value is OKLCH, the color picker might show black, but the text will be correct.

const extractVariable = (css: string, varName: string): string => {
  const regex = new RegExp(`${varName}:\\s*([^;]+);`);
  const match = css.match(regex);
  return match ? match[1].trim() : "";
};

const updateVariable = (
  css: string,
  varName: string,
  value: string
): string => {
  // Check if variable exists
  if (css.includes(`${varName}:`)) {
    const regex = new RegExp(`(${varName}:\\s*)([^;]+)(;)`);
    return css.replace(regex, `$1${value}$3`);
  } else {
    // Append to the end of the rule block (before the closing brace)
    const braceIndex = css.lastIndexOf("}");
    if (braceIndex !== -1) {
      return (
        css.slice(0, braceIndex) +
        `  ${varName}: ${value};\n` +
        css.slice(braceIndex)
      );
    }
    return css; // Fallback (shouldn't happen with valid CSS)
  }
};

export default function ThemeEditorModal({
  theme,
  isOpen,
  onClose,
  onSave,
}: {
  theme: UserTheme | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTheme: UserTheme) => void;
}) {
  const [name, setName] = useState("");
  const [css, setCss] = useState("");
  const [mode, setMode] = useState<"visual" | "code">("visual");

  // Visual Editor State
  const [visualData, setVisualData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const initialCss = theme ? theme.css : DEFAULT_CSS;
      const initialName = theme ? theme.name : "";

      setName(initialName);
      setCss(initialCss);

      // Parse CSS into visual data
      const parsedData: Record<string, string> = {};
      VARIABLE_GROUPS.forEach((group) => {
        group.variables.forEach((v) => {
          parsedData[v.name] = extractVariable(initialCss, v.name);
        });
      });
      setVisualData(parsedData);
      setMode("visual");
    }
  }, [theme, isOpen]);

  if (!isOpen) return null;

  const handleVisualChange = (varName: string, value: string) => {
    setVisualData((prev) => ({ ...prev, [varName]: value }));
    // Update raw CSS immediately to keep in sync
    setCss((prev) => updateVariable(prev, varName, value));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ ...theme!, name: name.trim(), css });
    onClose();
  };

  const syncVisualFromCode = () => {
    const parsedData: Record<string, string> = {};
    VARIABLE_GROUPS.forEach((group) => {
      group.variables.forEach((v) => {
        parsedData[v.name] = extractVariable(css, v.name);
      });
    });
    setVisualData(parsedData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-background border rounded-lg w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-muted/20 shrink-0">
          <h3 className="text-lg font-semibold">
            {theme ? "Edit Theme" : "Create New Theme"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>×</span>
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col p-4 gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex-1">
              <Label htmlFor="themeName" className="mb-2 block">
                Theme Name
              </Label>
              <Input
                id="themeName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Custom Theme"
              />
            </div>
            <div className="self-end pb-1">
              <Tabs
                value={mode}
                onValueChange={(v) => {
                  if (v === "visual") syncVisualFromCode();
                  setMode(v as any);
                }}
              >
                <TabsList>
                  <TabsTrigger value="visual" className="gap-2">
                    <Paintbrush className="w-4 h-4" /> Visual
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-2">
                    <Code className="w-4 h-4" /> Code
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <Separator />

          {/* Editor Area */}
          <div className="flex-1 min-h-0 relative">
            {mode === "visual" ? (
              <ScrollArea className="h-full pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                  {VARIABLE_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider border-b pb-1">
                        {group.name}
                      </h4>
                      <div className="space-y-2">
                        {group.variables.map((v) => (
                          <div key={v.name} className="flex flex-col gap-1.5">
                            <Label className="text-xs" htmlFor={v.name}>
                              {v.label}
                            </Label>
                            <div className="flex gap-2 items-center">
                              {/* Color Picker Swatch */}
                              <OklchColorPicker
                                color={visualData[v.name]}
                                onChange={(val) =>
                                  handleVisualChange(v.name, val)
                                }
                                className="w-10 h-8 shrink-0 border-2 border-muted"
                              />
                              <Input
                                id={v.name}
                                value={visualData[v.name] || ""}
                                onChange={(e) =>
                                  handleVisualChange(v.name, e.target.value)
                                }
                                className="font-mono text-xs h-8 flex-1"
                                placeholder="oklch(...) or #..."
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="h-full flex flex-col gap-2">
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="flex-1 w-full font-mono text-xs sm:text-sm p-4 border rounded bg-card text-card-foreground resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  spellCheck={false}
                />
                <p className="text-xs text-muted-foreground">
                  Edits here will be reflected in the Visual editor when you
                  switch back. Ensure the CSS class name matches the theme name
                  format (kebab-case).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/20 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Theme</Button>
        </div>
      </div>
    </div>
  );
}
