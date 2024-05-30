// mode/toggleLineMode.ts
import * as THREE from 'three';

export const toggleLineMode = (scene: THREE.Scene, showMode: boolean, activePoints: { x: number; y: number; z: number; }[]) => {
  scene.children = scene.children.filter(child => !(child instanceof THREE.Line && child.userData.isLine));
    if (scene) {
        // Remove existing lines, if any
        scene.children = scene.children.filter((child) => {
            if (child.userData.isLine) {
                scene.remove(child); // Properly dispose of the object if necessary
                return false;
            }
            return true;
        });
        if (showMode) {

            if (activePoints.length > 0) {
                // Create lines between all vertices
                for (let i = 0; i < activePoints.length; i++) {
                    for (let j = i + 1; j < activePoints.length; j++) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            new THREE.Vector3(activePoints[i].x, activePoints[i].y, activePoints[i].z),
                            new THREE.Vector3(activePoints[j].x, activePoints[j].y, activePoints[j].z)
                        ]);

                        const material = new THREE.LineBasicMaterial({
                            color: 0x000000 // Black color for the line
                        });

                        const line = new THREE.Line(geometry, material);
                        line.userData.isLine = true;
                        scene.add(line);
                    }
                }
            }
        }
    }
};
