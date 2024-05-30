// mode/toggleMiniCubeMode.ts
import * as THREE from 'three';
interface MiniCubeParams { 
    width: number,
    height: number,
    depth: number,
    spacing: number
  };
  
export const toggleMiniCubeMode = (params: MiniCubeParams, scene: THREE.Scene, showMode: boolean, activePoints: { x: number; y: number; z: number; }[]) => {

    console.log(activePoints);
    if (scene && activePoints.length > 0) {
        // Remove existing convex geometry, if any
        scene.children = scene.children.filter((child) => {
          if (child.userData.isMiniCube || child.userData.isLight) {
              scene.remove(child); // Properly dispose of the object if necessary
              return false;
          }
          return true;
      });
    
        if (showMode) {
          // Create a new convex geometry using the active points
          const vertices = activePoints.map((point) => new THREE.Vector3(point.x, point.y, point.z));
          
          vertices.forEach(vertex => {
              const cubeSize = 1 * params.spacing; // Size of the mini cube
              
              // Solid cube material
              const solidMaterial = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(0xffffff), // White color for the cube
                  opacity: 0.5,
                  roughness: 0.2, // Adjust as needed
              });
              
              // Wireframe material
              const wireframeMaterial = new THREE.MeshBasicMaterial({
                  color: new THREE.Color(0x000000), // Black color for the wireframe
                  wireframe: true
              });

              // Geometry for the mini cube
              const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

              // Create the mesh with solid material
              const solidCube = new THREE.Mesh(geometry, solidMaterial);
              solidCube.position.copy(vertex);
              solidCube.userData.isMiniCube = true;
              scene.add(solidCube);

              // Create the mesh with wireframe material
              const wireframeCube = new THREE.Mesh(geometry, wireframeMaterial);
              wireframeCube.position.copy(vertex);
              solidCube.userData.isMiniCube = true;
              scene.add(wireframeCube);
          });

          
           // Add lighting to the scene
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white ambient light
          const pointLight1 = new THREE.PointLight(0xffffff, 2); // Strong point light
          pointLight1.position.set(10, 10, 10); // Adjust position as needed

          const pointLight2 = new THREE.PointLight(0xffffff, 2); // Another strong point light for better visibility
          pointLight2.position.set(-10, -10, 10); // Adjust position as needed

          scene.add(ambientLight);
          scene.add(pointLight1);
          scene.add(pointLight2);
          
          //setTotalPointCount(totalPointCount);
          //setFaceCount(faceCount);
          //setEdgeCount(edgeCount);

        }
      }
};
