import type { Star } from "./star";

export interface Constellation {
  name: string;
  stars: Star[];
  connections: number[][]; // Pairs of star indices to connect
  links: {
    github: string;
    site?: string;
  }; // URLs to redirect on click
  icon?: string;
  description: string;
}
