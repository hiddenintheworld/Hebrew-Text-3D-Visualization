import * as THREE from 'three';

// Function to add point lights to the scene
export const addPointLights = (scene: THREE.Scene) => {
    const light1 = new THREE.PointLight(0xffffff, 1.5, 20);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1.5, 20);
    light2.position.set(-10, 10, -10);
    scene.add(light2);
};

// Function to add ambient light to the scene
export const addAmbientLight = (scene: THREE.Scene) => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
};

// Function to add spotlight to the scene
export const addSpotlight = (scene: THREE.Scene) => {
    const spotlight = new THREE.SpotLight(0xffffff, 1.5, 50, Math.PI / 6, 0.5);
    spotlight.position.set(0, 15, 0);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);
};

// Function to add directional light to the scene
export const addDirectionalLight = (scene: THREE.Scene) => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
};
