"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { THEMES } from "@/app/themes";
import type { UserTheme } from "@/types/usertheme";
import { X } from "lucide-react";
import ThemeEditorModal from "@/components/settings/ThemeEditorModal";


interface ThemeDescriptor {
	key: string;
	name: string;
	type: "System" | "User";
	css?: string;
}

type GroupedThemes = Record<"System" | "User", ThemeDescriptor[]>;



const ColorSwatch = ({ color, label }: { color: string; label: string }) => {
	return (
		<div className="flex flex-col items-center">
			<div
				className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm border border-border"
				style={{ backgroundColor: color }}
				title={color}
			/>
			<span className="text-[10px] sm:text-xs mt-1">{label}</span>
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

const getTextColorForTheme = (themeClass: string): string => {
	const tempElement = document.createElement("div");
	tempElement.className = themeClass;
	tempElement.style.position = "absolute";
	tempElement.style.visibility = "hidden";
	document.body.appendChild(tempElement);

	const computedStyle = getComputedStyle(tempElement);
	const bgColorValue = computedStyle.getPropertyValue("--background").trim();
	document.body.removeChild(tempElement);

	const match = bgColorValue.match(/oklch\(\s*([\d.]+)\s+/);
	if (match) {
		const lightness = parseFloat(match[1]);
		return lightness > 0.5 ? "text-foreground" : "text-white";
	}
	return "text-foreground";
};

export default function AppearanceSettings() {
	const { theme, setTheme } = useTheme();
	const [themeColors, setThemeColors] = useState<Record<string, { primary: string; secondary: string; accent: string; background: string }>>({});
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
			const colors: Record<string, { primary: string; secondary: string; accent: string; background: string }> = {};
			const userThemes = JSON.parse(localStorage.getItem("user-themes") || "[]").map((theme: UserTheme) => {
				const match = theme.css.match(/\.([^\s{]+)/);
				return { name: theme.name, key: match ? match[1] : null, type: "User", css: theme.css };
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
		const existingThemes = JSON.parse(localStorage.getItem("user-themes") || "[]");
		const themesArray = Array.isArray(existingThemes) ? existingThemes : [];

		const classMatch = updatedTheme.css.match(/\.([^\s{]+)/);
		const originalClass = classMatch ? classMatch[1] : updatedTheme.name.replace(/\s+/g, "-").toLowerCase();
		const newClass = `user-${originalClass}`;
		const newCss = updatedTheme.css.replace(/\.([^\s{]+)/, `.${newClass}`);
		const themeToSave = { ...updatedTheme, key: newClass, css: newCss };

		const index = themesArray.findIndex((t) => t.name === updatedTheme.name);
		if (index >= 0) themesArray[index] = themeToSave;
		else themesArray.push(themeToSave);

		localStorage.setItem("user-themes", JSON.stringify(themesArray));
		setRefreshColors((prev) => prev + 1);
		setIsModalOpen(false);
		setEditingTheme(null);
	};

	return (
		<div className="space-y-6 px-2 sm:px-0">
			<p className="text-lg font-medium text-center sm:text-left">
				Current Theme:{" "}
				<span className="font-semibold">
					{mounted ? (THEMES.find((t) => t.key === theme)?.name || theme) : "Loading..."}
				</span>
			</p>

			{Object.entries(groupedThemes).map(([type, themes]: any) => (
				<div key={type} className="space-y-2">
					<h2 className="text-lg sm:text-xl font-semibold capitalize">{type} Themes</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
						{themes.map(({ key, name }: ThemeDescriptor) => {
							const isCurrent = theme === key;
							const colors = themeColors[key];
							const textColorClass = colors ? getTextColorForTheme(key) : "text-foreground";

							return (
								<div
									key={key}
									className={`group border rounded-lg p-2 flex flex-col relative text-sm ${isCurrent
											? "ring-2 ring-ring ring-offset-2"
											: "border-border hover:border-destructive/30"
										}`}
								>
									{type === "User" && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

												const existingThemes = JSON.parse(localStorage.getItem("user-themes") || "[]") as UserTheme[];
												const updatedThemes = existingThemes.filter((t) => t.name !== name);
												localStorage.setItem("user-themes", JSON.stringify(updatedThemes));

												const themeToDelete = allThemes.find((t) => t.key === key && t.type === "User");
												if (themeToDelete) {
													const classMatch = themeToDelete.css.match(/\.([^\s{]+)/);
													const className = classMatch ? classMatch[1] : key;

													const styleTag = document.getElementById(`user-theme-${className}`);
													if (styleTag) styleTag.remove();

													if (isCurrent) setTheme("dark");
													if (injectedClass === className) setInjectedClass(null);
												}

												setRefreshColors((prev) => prev + 1);
											}}
											className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-destructive hover:text-destructive/80 rounded-full hover:bg-destructive/10"
											aria-label="Delete theme"
										>
											<X className="w-3 h-3 sm:w-4 sm:h-4" />
										</button>
									)}

									<div className="flex justify-between items-start mb-1">
										<h3 className={`${textColorClass} font-medium text-xs sm:text-sm truncate`}>
											{name}
										</h3>
										<div className="flex gap-1 mt-1 flex-wrap justify-end">
											{type === "User" && (
												<Button
													variant="outline"
													size="sm"
													onClick={() => {
														const themeToEdit = allThemes.find((t) => t.key === key && t.type === "User");
														if (themeToEdit) {
															setEditingTheme({
																name: themeToEdit.name,
																css: themeToEdit.css,
																id: themeToEdit.id,
															});
															setIsModalOpen(true);
														}
													}}
													className="text-[10px] sm:text-xs px-2 py-1"
												>
													Edit
												</Button>
											)}

											<Button
												variant={isCurrent ? "secondary" : "outline"}
												size="sm"
												onClick={() => switchTheme(key)}
												className="text-[10px] sm:text-xs px-2 py-1"
												disabled={!colors}
											>
												{isCurrent ? "Active" : "Apply"}
											</Button>
										</div>
									</div>

									{colors && (
										<div className="flex space-x-1 sm:space-x-2 justify-center mt-auto">
											<ColorSwatch color={colors.primary} label="Primary" />
											<ColorSwatch color={colors.secondary} label="Secondary" />
											<ColorSwatch color={colors.accent} label="Accent" />
										</div>
									)}
									{!colors && (
										<div className="flex justify-center items-center mt-auto h-6">
											<span className="text-xs text-muted-foreground">Loading...</span>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			))}

			<div className="flex justify-center sm:justify-start">
				<Button
					onClick={() => {
						setEditingTheme(null);
						setIsModalOpen(true);
					}}
					className="text-sm px-3 py-1"
				>
					Create New Theme
				</Button>
			</div>

			<ThemeEditorModal
				key={isModalOpen ? (editingTheme ? `edit-${editingTheme.name}` : "create") : "closed"}
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
