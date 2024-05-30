import { Font } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';

// Interfaces and constants
export interface GridSize {
  width: number;
  height: number;
  depth: number;
}

export const letters: string[] = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];

// Define a color for each letter
export const letterColors: { [key: string]: string } = letters.reduce<{ [key: string]: string }>((acc, letter, index) => {
    const hue = (360 * index / letters.length) % 360;
    acc[letter] = `hsl(${hue}, 100%, 50%)`; // Creates a color string in HSL format
    return acc;
  }, {});
  
export const letterMapping = {
  'א': 0, 'ב': 1, 'ג': 2, 'ד': 3, 'ה': 4, 'ו': 5, 'ז': 6, 'ח': 7, 'ט': 8, 'י': 9,
  'כ': 10, 'ל': 11, 'מ': 12, 'נ': 13, 'ס': 14, 'ע': 15, 'פ': 16, 'צ': 17, 'ק': 18, 'ר': 19,
  'ש': 20, 'ת': 21
};
