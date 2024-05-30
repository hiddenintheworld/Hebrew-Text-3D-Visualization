import * as THREE from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { loadFont } from './fontLoaderModule';
import { loadTextData } from './utils';
import { addTextMeshesToScene } from './textMesh';
import { createGUI } from './guiModule';

export const englishLetters: string[] = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  
export  const englishMapping: { [key: string]: number } = {
    'a': 0, 'b': 1, 'c' : 2, 'd' : 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9,
    'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18, 't': 19,
    'u': 20, 'v': 21, 'w': 22, 'x': 23, 'y': 24, 'z': 25
  };
  
export  const letters: string[] = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
  
  
export  const letterMapping = {
    'א': 0, 'ב': 1, 'ג': 2, 'ד': 3, 'ה': 4, 'ו': 5, 'ז': 6, 'ח': 7, 'ט': 8, 'י': 9,
    'כ': 10, 'ל': 11, 'מ': 12, 'נ': 13, 'ס': 14, 'ע': 15, 'פ': 16, 'צ': 17, 'ק': 18, 'ר': 19,
    'ש': 20, 'ת': 21
  };
  
  
  // Function to initialize the letter filter for the UI
export const createInitialLetterFilter = (letters: string[]) => {
    return letters.reduce((acc, letter) => ({ ...acc, [letter]: true }), {});
};
interface FontDataLoaderParams {
    scene: THREE.Scene;
    setGui: (gui: any) => void;
    letterFilter: { [key: string]: boolean };
    fontUrl: string;
    dataUrl: string;
    meshParams: {
        width: number;
        height: number;
        depth: number;
        spacing: number;
        showMode: boolean;
    };
}

export const loadFontAndData = ({
    scene,
    setGui,
    letterFilter,
    fontUrl,
    dataUrl,
    meshParams
}: FontDataLoaderParams) => {
    loadFont(fontUrl, (font) => {
        loadTextData(dataUrl).then(text => {
            if (text) {
                const numberArray = JSON.parse(text);
                const letterString = numberArray.map((num: number) => letters[num]).join('');
                const textMeshParams = {
                    width: meshParams.width,
                    height: meshParams.height,
                    depth: meshParams.depth,
                    spacing: meshParams.spacing
                };

                addTextMeshesToScene(letterString, scene, font, textMeshParams, meshParams.spacing, letterFilter);

                if (font) {
                    let gui = createGUI(letterFilter, scene, font, letterString, meshParams);
                    setGui(gui);
                }
            }
        });
    });
};
