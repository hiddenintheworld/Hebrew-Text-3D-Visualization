// mode/toggleMeshMode.ts
import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

export const toggleMeshMode = (scene: THREE.Scene, showMode: boolean, activePoints: { x: number; y: number; z: number; }[]) => {
    if (scene && activePoints.length > 0) {
         // Remove existing convex geometry, if any
         scene.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof ConvexGeometry) {
              scene.remove(child);
            }
            if (child instanceof THREE.Light) {
                scene.remove(child);
            }
          });
      
        if (showMode) {
            // Create a new convex geometry using the active points
            const vertices = activePoints.map((point) => new THREE.Vector3(point.x, point.y, point.z));
                        
            //console.log(vertices)
            const geometry = new ConvexGeometry(vertices);
            const material = new THREE.MeshStandardMaterial({ 
                color: new THREE.Color(0.7, 0.7, 0.7), // Brighter grey color
                roughness: 0.3, // Adjust as needed
                metalness: 0,  // Adjust as needed,

            });
            const mesh = new THREE.Mesh(geometry, material);
            // Create the wireframe material
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000,  linewidth: 2}); // Black color for edges
            const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), wireframeMaterial);
            
            // Add lighting to the scene
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white ambient light
            const pointLight1 = new THREE.PointLight(0xffffff, 2); // Strong point light
            pointLight1.position.set(10, 10, 10); // Adjust position as needed

            const pointLight2 = new THREE.PointLight(0xffffff, 2); // Another strong point light for better visibility
            pointLight2.position.set(-10, -10, 10); // Adjust position as needed

            scene.add(ambientLight);
            scene.add(pointLight1);
            scene.add(pointLight2);
            
            scene.add(mesh);
            scene.add(wireframe);
        }
}
};
