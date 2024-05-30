import { Font } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { letterColors } from './dataModels';

interface GridSize {
    width: number;
    height: number;
    depth: number;
  }
  
export function addTextMeshesToScene(text: string, scene: THREE.Scene, font: Font, gridSize: GridSize, spacing: number, letterFilter: { [key: string]: boolean }) {
  scene.children.slice().forEach(child => scene.remove(child)); // Clear previous meshes

  const maxChars = gridSize.width * gridSize.height * gridSize.depth;
  for (let i = 0; i < Math.min(text.length, maxChars); i++) {
    const letter = text[i];
    if (!letterFilter[letter]) continue;

    const color = letterColors[letter] || '#FFFFFF';
    const material = new THREE.MeshBasicMaterial({ color });
    const textGeo = new TextGeometry(letter, {
      font: font,
      size: 1,
      height: 0.1,
    });
    const mesh = new THREE.Mesh(textGeo, material);
    const x = i % gridSize.width;
    const y = Math.floor(i / gridSize.width) % gridSize.height;
    const z = Math.floor(i / (gridSize.width * gridSize.height));
    mesh.position.set(x * spacing, y * spacing, z * spacing);
    scene.add(mesh);
  }
}