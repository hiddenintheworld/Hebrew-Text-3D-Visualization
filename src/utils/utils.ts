import * as THREE from 'three';
// Utility functions like fetch utilities, point scanning, etc.
export async function loadTextData(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading text data:', error);
      return null;
    }
  }
  
  
  export function scanActivePoints(scene: THREE.Scene): { x: number, y: number, z: number }[] {
    const points: { x: number, y: number, z: number }[] = [];
    scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        points.push({
          x: child.position.x,
          y: child.position.y,
          z: child.position.z
        });
      }
    });
    return points;
  }
  