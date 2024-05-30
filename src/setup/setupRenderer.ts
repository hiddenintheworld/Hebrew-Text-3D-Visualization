import * as THREE from 'three';

export const initRenderer = (): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Set background color to grey
  renderer.setClearColor(0x808080);
  return renderer;
};

export const appendRendererElement = (renderer: THREE.WebGLRenderer): void => {
  document.body.appendChild(renderer.domElement);
};