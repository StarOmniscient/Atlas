//app/themes.ts

//  key should be the same as class name in css eg light, dark

import { Theme } from "@/types/theme";

const THEMES: Theme[] = [
  { key: "light", name: "Light", type: "light" },
  { key: "dark", name: "Dark", type: "dark" },

];

export { THEMES };