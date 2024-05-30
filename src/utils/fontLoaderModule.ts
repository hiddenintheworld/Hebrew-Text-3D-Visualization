import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';

export const loadFont = (url: string, onLoad: (font: Font) => void, onError?: (error: unknown) => void) => {
    const loader = new FontLoader();
    loader.load(url, onLoad, undefined, onError);
};
