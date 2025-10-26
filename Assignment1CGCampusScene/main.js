import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- SCENE SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(70, 40, 70);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- LIGHTS ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(30, 40, 20);
scene.add(dirLight);

// --- GROUND (GRASS) ---
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x2e8b57 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(75, 75), grassMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// --- ROAD MATERIAL ---
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x2b2b2b });

// --- ROAD 1 (horizontal main road) ---
const road1 = new THREE.Mesh(new THREE.PlaneGeometry(75, 8), roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.set(0, 0.03, -10);
scene.add(road1);

// --- ROAD 2 (diagonal right-down) ---
const road2 = new THREE.Mesh(new THREE.PlaneGeometry(55, 8), roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.rotation.z = -Math.PI / 3;
road2.position.set(10, 0.03, 13);
scene.add(road2);

// --- ROAD 3 (vertical down-left) ---
const road3 = new THREE.Mesh(new THREE.PlaneGeometry(50, 8), roadMaterial);
road3.rotation.x = -Math.PI / 2;
road3.rotation.z = Math.PI / 2;
road3.position.set(-20, 0.03, 12.5);
scene.add(road3);

// --- PARKING AREA ---
const parkingMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
const parking = new THREE.Mesh(new THREE.PlaneGeometry(25, 18), parkingMaterial);
parking.rotation.x = -Math.PI / 2;
parking.position.set(18, 0.04, -23);
scene.add(parking);

// --- BUILDING MATERIALS ---
// Rectorate – smooth & slightly reflective
const rectorateMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.2, // smooth surface
  metalness: 0.3
});
// Building 2 and 3 – shiny modern look
const buildingMat1 = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  shininess: 80, // increases specular highlight
  specular: new THREE.Color(0xaaaaaa)
});
// Building 4 – warm textured look
const buildingMat2 = new THREE.MeshLambertMaterial({
  color: 0xffcc99,
  emissive: 0x331a00 // subtle warm glow
});

// --- FUNCTION TO CREATE BUILDINGS ---
function makeBuilding(w, h, d, material, x, z, rot = 0) {
  const building = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  building.position.set(x, h / 2, z);
  building.rotation.y = rot;
  scene.add(building);
  return building;
}

// --- BUILDINGS ---
// Rectorate
makeBuilding(25, 8, 14, rectorateMat, -15, -23);

// Building 2 (upper right on road 2)
makeBuilding(8, 4, 6, buildingMat1, 14, 2, -Math.PI / 3);

// Building 3 (bottom right on road 2)
makeBuilding(8, 4, 6, buildingMat1, 24, 20, -Math.PI / 3);

// Building 4 (middle between roads 1 & 2)
makeBuilding(22, 4, 6, buildingMat2, 0, 20, -Math.PI / 6);

// --- STREET LAMPS ---
const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffee88 });

function makeLamp(x, z) {
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4), poleMaterial);
  pole.position.set(x, 2, z);
  scene.add(pole);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), bulbMaterial);
  bulb.position.set(x, 4.2, z);
  scene.add(bulb);

  const light = new THREE.PointLight(0xffee88, 1, 12);
  light.position.set(x, 4.2, z);
  scene.add(light);
}

// Lamps along Road 1
for (let i = -25; i <= 25; i += 10) {
  makeLamp(i, -15);
  makeLamp(i, -5);
}



// Lamps along Road 2 (aligned with diagonal)
const road2Angle = Math.PI / 3;  // same rotation as Road 2
const road2Start = new THREE.Vector2(10, 4); // start near road 1 connection
const lampSpacing = 10;           // distance between lamps
const lampCount = 4;              // number of lamps

for (let i = 0; i < lampCount; i++) {
  const distance = i * lampSpacing;
  const x = road2Start.x + Math.cos(road2Angle) * distance;
  const z = road2Start.y + Math.sin(road2Angle) * distance;
  makeLamp(x, z);
}

// Lamps along Road 3 (vertical)
for (let i = -5; i <= 25; i += 10) {
  const x = -20;
  const z = 5 + i;
  makeLamp(x - 5, z);
  makeLamp(x + 5, z);
}

// --- RENDER LOOP ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// --- RESIZE HANDLER ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
