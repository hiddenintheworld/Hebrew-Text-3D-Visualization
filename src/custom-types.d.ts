// src/custom-types.d.ts
declare module 'three/examples/jsm/loaders/FontLoader' {
    import { Loader, LoadingManager } from 'three';
  
    export class FontLoader extends Loader {
      constructor(manager?: LoadingManager);
      load(
        url: string,
        onLoad: (responseFont: Font) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      parse(json: any): Font;
    }
  
    export interface FontData {
      glyphs: { [key: string]: any };
      familyName: string;
      resolution: number;
      boundingBox: {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
      };
      underlineThickness: number;
      underlinePosition: number;
    }
  
    export class Font {
      constructor(data: FontData);
      data: FontData;
      generateShapes(text: string, size: number): any[];
    }
  }
  
  declare module 'three/examples/jsm/geometries/TextGeometry' {
    import { ExtrudeGeometry } from 'three';
    import { Font } from 'three/examples/jsm/loaders/FontLoader';
  
    export class TextGeometry extends ExtrudeGeometry {
      constructor(text: string, parameters: {
        font: Font;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      });
    }
  }
  