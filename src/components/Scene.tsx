import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
// Import FontLoader and TextGeometry from the examples directory
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { loadTextData, scanActivePoints } from '../utils/utils';
import { addTextMeshesToScene } from '../utils/textMesh';
import { toggleLineMode } from '../utils/mode/toggleLineMode';
import { toggleMeshMode } from '../utils/mode/toggleMeshMode';
import { toggleMiniCubeMode } from '../utils/mode/toggleMiniCubeMode';
import { createGUI } from '../utils/guiModule';
import { addPointLights, addAmbientLight, addSpotlight, addDirectionalLight } from '../setup/setupLights'; // Import our lighting setup module
import { initControls, handleResize } from '../setup/setupControls'; // Import our controls setup module
import {englishLetters, englishMapping, letters, letterMapping, createInitialLetterFilter, loadFontAndData } from '../utils/fontDataLoader';
import { initCamera } from '../setup/setupCamera'; // Import the camera setup module
import { initRenderer, appendRendererElement } from '../setup/setupRenderer';

const Scene = () => {
  const [gui, setGui] = useState<any>(null);
  const [letterFilter, setLetterFilter] = useState<{ [key: string]: boolean }>(createInitialLetterFilter(letters));

  const sceneRef = useRef<THREE.Scene | null>(null);
  const fontRef = useRef<Font | null>(null);
  const textDataRef = useRef<string>('');
  const [totalPointCount, setTotalPointCount] = useState(0);
  const [faceCount, setFaceCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);


  //const [activePoints, setActivePoints] = useState<{ x: number; y: number; z: number; }[]>([]);
    const [currentFilter, setCurrentFilter] = useState(letterFilter);

    
    

  useEffect(() => {
    const scene = new THREE.Scene();
    
    sceneRef.current = scene;
    const camera = initCamera(); // Use the new camera setup module
    const renderer = initRenderer();
    appendRendererElement(renderer);

    // Set background color to grey
    renderer.setClearColor(0x808080);

    // Use the new lighting setup functions
    addPointLights(scene);
    addAmbientLight(scene);
    addSpotlight(scene);
    addDirectionalLight(scene);

  
  
    loadFontAndData({
      scene,
      setGui,
      letterFilter,
      fontUrl: '/config/saclm.typeface.json',
      dataUrl: '/data/genesis_processed_data.txt',
      meshParams: {
          width: 7,
          height: 7,
          depth: 7,
          spacing: 1.5,
          showMode: false
      }
  });

    const controls = initControls(camera, renderer);
    // Handle window resize
    handleResize(camera, renderer);
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
 
  }, []);
return null;
  //return (
  //  <div>
   //     <p>Total Points: {totalPointCount}</p>
  //      <p>Faces: {faceCount}</p>
  //      <p>Edges: {edgeCount}</p>
  //    </div>
  //);
};

export default Scene;
