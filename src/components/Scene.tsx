import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
// Import FontLoader and TextGeometry from the examples directory
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

const englishLetters: string[] = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

const englishMapping: { [key: string]: number } = {
  'a': 0, 'b': 1, 'c' : 2, 'd' : 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9,
  'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18, 't': 19,
  'u': 20, 'v': 21, 'w': 22, 'x': 23, 'y': 24, 'z': 25
};

const letters: string[] = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];


const letterMapping = {
  'א': 0, 'ב': 1, 'ג': 2, 'ד': 3, 'ה': 4, 'ו': 5, 'ז': 6, 'ח': 7, 'ט': 8, 'י': 9,
  'כ': 10, 'ל': 11, 'מ': 12, 'נ': 13, 'ס': 14, 'ע': 15, 'פ': 16, 'צ': 17, 'ק': 18, 'ר': 19,
  'ש': 20, 'ת': 21
};

// Define a color for each letter
const letterColors: { [key: string]: string } = letters.reduce<{ [key: string]: string }>((acc, letter, index) => {
  const hue = (360 * index / letters.length) % 360;
  acc[letter] = `hsl(${hue}, 100%, 50%)`; // Creates a color string in HSL format
  return acc;
}, {});


async function loadTextData(url: string): Promise<string | null> {
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


interface GridSize {
  width: number;
  height: number;
  depth: number;
}



const Scene = () => {
  const [gui, setGui] = useState<any>(null);
  const [letterFilter, setLetterFilter] = useState<{ [key: string]: boolean }>(
    letters.reduce((acc, letter) => ({ ...acc, [letter]: true }), {})
  );
  const sceneRef = useRef<THREE.Scene | null>(null);
  const fontRef = useRef<Font | null>(null);
  const textDataRef = useRef<string>('');
  const [totalPointCount, setTotalPointCount] = useState(0);
  const [faceCount, setFaceCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);


  //const [activePoints, setActivePoints] = useState<{ x: number; y: number; z: number; }[]>([]);
    const [currentFilter, setCurrentFilter] = useState(letterFilter);

    function scanActivePoints(scene: THREE.Scene): { x: number, y: number, z: number }[] {
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
    
        //console.log(points);
        return points;
    }
    

function addTextMeshesToScene(text: string, scene: THREE.Scene, font: Font, gridSize: GridSize, spacing: number, letterFilter: { [key: string]: boolean }) {
    scene.children.slice().forEach(child => scene.remove(child)); // Clear previous meshes
  
    const maxChars = gridSize.width * gridSize.height * gridSize.depth;


    for (let i = 0; i < Math.min(text.length, maxChars); i++) {
      const letter = text[i];
      if (!letterFilter[letter]) continue; // Skip letters that are filtered out
  
      const color = letterColors[letter] || '#FFFFFF';
      const material = new THREE.MeshBasicMaterial({ color }); // Use MeshPhongMaterial instead of MeshBasicMaterial
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
    setCurrentFilter(letterFilter);
  }
  useEffect(() => {
    const scene = new THREE.Scene();
    
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set background color to grey
    renderer.setClearColor(0x808080);

    // Adjusting point lights to be closer to the objects
    const light1 = new THREE.PointLight(0xffffff, 1.5, 20);
    light1.position.set(10, 10, 10);  // Much closer to your objects
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1.5, 20);
    light2.position.set(-10, 10, -10);  // Provides balanced lighting from another angle
    scene.add(light2);

    // Enhanced ambient light for softer overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Reduced intensity for a more subtle effect
    scene.add(ambientLight);

    // Spotlight for focused lighting, closer to the scene's central point
    const spotlight = new THREE.SpotLight(0xffffff, 1.5, 50, Math.PI / 6, 0.5);  // Narrower beam for a focused effect
    spotlight.position.set(0, 15, 0);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Adding a directional light for even, broad coverage
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(1, 1, 1);  // Positioned to simulate a general light source like the sun
    scene.add(directionalLight);

    const fontLoader = new FontLoader();
    fontLoader.load('/config/saclm.typeface.json', function (font) {
      fontRef.current = font;
      loadTextData('/data/genesis_processed_data.txt')
        .then(text => {
          if (text) {
            const numberArray = JSON.parse(text);
            const letterString = numberArray.map((num: number) => letters[num]).join(''); // Explicitly defining `num` as type `number`
            textDataRef.current = letterString;
            addTextMeshesToScene(letterString, scene, font, { width: 7, height: 7, depth: 7 }, 1.5, letterFilter);
            animate();
          }
        });
    });
    camera.position.z = 20;

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Import GUI
    const importGUI = async () => {
      const { GUI } = await import('dat.gui');
      return GUI;
    };

    importGUI().then((GUI) => {
      const gui = new GUI();
      setGui(gui);

      const params = {
        width: 7,
        height: 7,
        depth: 7,
        spacing: 1.5,
        showMode: false // new parameter
      };

      gui.add(params, 'width', 1, 100).onChange(() => updateScene(params));
      gui.add(params, 'height', 1, 100).onChange(() => updateScene(params));
      gui.add(params, 'depth', 1, 100).onChange(() => updateScene(params));
      gui.add(params, 'spacing', 0.1, 5).onChange(() => updateScene(params));
      // Add the showMode parameter to the GUI
      gui.add(params, 'showMode').name('Toggle Mesh Mode').onChange(() => toggleMeshMode(params.showMode));
      gui.add(params, 'showMode').name('Toggle Mini Cube Mode').onChange(() => toggleMiniCubeMode(params.showMode));

      letters.forEach(letter => {
        gui.add(letterFilter, letter).onChange(() => updateScene(params));
      });

      const updateScene = (params: { width: number, height: number, depth: number, spacing: number }) => {
        if (scene && fontRef.current) {
          addTextMeshesToScene(textDataRef.current, scene, fontRef.current, { width: params.width, height: params.height, depth: params.depth }, params.spacing, letterFilter);
        }
      };

      const toggleMiniCubeMode = (showMode: boolean) => {
        //console.log(scene);
        let activePoints = scanActivePoints(scene);
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
      const toggleMeshMode = (showMode: boolean) => {
        //console.log(scene);
        let activePoints = scanActivePoints(scene);
        console.log(activePoints);
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
            
            // Calculate the counts
            const uniquePoints = new Set(vertices.map(v => v.toArray().toString()));
            const totalPointCount = uniquePoints.size;
            const faceCount = geometry.getAttribute('position').count / 3;
            const edgeCount = new THREE.EdgesGeometry(geometry).attributes.position.count / 2;

              // Log the counts to the console
            //console.log(`Total Points: ${totalPointCount}`);
            //console.log(`Faces: ${faceCount}`);
            //console.log(`Edges: ${edgeCount}`);

            setTotalPointCount(totalPointCount);
            setFaceCount(faceCount);
            setEdgeCount(edgeCount);
            
            scene.add(mesh);
            scene.add(wireframe);
          }
        }
      };
    });
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
