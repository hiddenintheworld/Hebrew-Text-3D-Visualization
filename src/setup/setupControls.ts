import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

// Function to initialize and configure OrbitControls
export const initControls = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;
    return controls;
};

// Function to handle resizing the renderer and camera aspect ratio
export const handleResize = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);
    return onWindowResize; // Return the function for potential removal later
};
