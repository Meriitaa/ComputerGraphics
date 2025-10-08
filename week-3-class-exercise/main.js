import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

//Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

//Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Floor (Plane) 
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x444444,
  roughness: 0.8
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
floor.receiveShadow = true;
scene.add(floor);

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 15, 100);
const torusMaterial = new THREE.MeshLambertMaterial({ color: 0xff80ff });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 0;
scene.add(torus);

//  Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x800800,
  metalness: 0.8,
  roughness: 0.2
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -3;
scene.add(sphere);

// Octahedron 
const octaGeometry = new THREE.OctahedronGeometry(1);
const octaMaterial = new THREE.MeshPhongMaterial({
  color: 0x02ccff,
  specular: 0xffffff,
  shininess: 80
});
const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
octahedron.position.x = 3;
scene.add(octahedron);

//  Lighting 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
scene.add(lightHelper);

//  Animation loop 
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  sphere.rotation.y += 0.01;

  octahedron.rotation.x += 0.01;
  octahedron.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
