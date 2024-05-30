import * as THREE from 'three';
import { addTextMeshesToScene } from './textMesh';
import { toggleLineMode } from './mode/toggleLineMode';
import { toggleMeshMode } from './mode/toggleMeshMode';
import { toggleMiniCubeMode } from './mode/toggleMiniCubeMode';
import { loadTextData, scanActivePoints } from './utils';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
export async function createGUI(letterFilter: {[key: string]: boolean}, scene: THREE.Scene, font: Font, textData: string, params: {width: number, height: number, depth: number, spacing: number, showMode: boolean}) {
  const { GUI } = await import('dat.gui');
  
  const gui = new GUI();

  gui.add(params, 'width', 1, 100).onChange(() => updateScene(params));
  gui.add(params, 'height', 1, 100).onChange(() => updateScene(params));
  gui.add(params, 'depth', 1, 100).onChange(() => updateScene(params));
  gui.add(params, 'spacing', 0.1, 5).onChange(() => updateScene(params));

  // Add the showMode parameter to the GUI
  gui.add(params, 'showMode').name('Toggle Mesh Mode').onChange(() => {
    const activePoints = scanActivePoints(scene);
    toggleMeshMode(scene, params.showMode, activePoints);
  });

  gui.add(params, 'showMode').name('Toggle Mini Cube Mode').onChange(() => {
    const activePoints = scanActivePoints(scene);
    toggleMiniCubeMode(params, scene, params.showMode, activePoints);
  });

  gui.add(params, 'showMode').name('Toggle Line Mode').onChange(() => {
    const activePoints = scanActivePoints(scene);
    toggleLineMode(scene, params.showMode, activePoints);
  });

  Object.keys(letterFilter).forEach(letter => {
    gui.add(letterFilter, letter).onChange(() => updateScene(params));
  });

  const updateScene = (params: { width: number, height: number, depth: number, spacing: number }) => {
    if (scene && font) {
      addTextMeshesToScene(textData, scene, font, { width: params.width, height: params.height, depth: params.depth }, params.spacing, letterFilter);
    }
  };

  return gui;
}